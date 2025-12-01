pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rudska6/worket-client"
        DOCKER_TAG = "latest"
        EC2_HOST = "ubuntu@${CLIENT_IP}"
        COMPOSE_FILE = "docker-compose.yml"

        // SonarQube Token (Jenkins Credentials)
        SONAR_TOKEN = credentials('sonarqube-token-front')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'feature/deploy-setup',
                    credentialsId: 'github',
                    url: 'https://github.com/Team-gighub/worket-client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "npm install --legacy-peer-deps"
            }
        }

        // ============================
        //      SonarQube Analysis
        // ============================
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh """
                        sonar-scanner \
                            -Dsonar.projectKey=worket-client \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/node_modules/**,**/.next/**,**/dist/** \
                            -Dsonar.host.url=$SONAR_HOST_URL \
                            -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        // stage('Quality Gate') {
        //     steps {
        //         timeout(time: 3, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        stage('Inject ENV') {
            steps {
                sh '''
                    printf "NEXT_PUBLIC_API_BASE_URL=https://api.worket.site" > .env
                '''
            }
        }

        stage('Next.js Build') {
            steps {
                sh "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-login',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo \"$DOCKER_PASS\" | docker login -u \"$DOCKER_USER\" --password-stdin"
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Deploy to EC2 (docker-compose)') {
            steps {
                sshagent(credentials: ['deploy-key']) {
                    sh """
ssh -o StrictHostKeyChecking=no ${EC2_HOST} << 'EOF'
cd ~/worket-client || (mkdir ~/worket-client && cd ~/worket-client)
docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}
docker rm -f worket-client || true
docker compose up -d
EOF
"""
                }
            }
        }

    }
}
