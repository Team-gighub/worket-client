pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rudska6/worket-client"
        DOCKER_TAG = "latest"
        EC2_HOST = "ubuntu@${CLIENT_IP}"
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

        stage('Inject ENV') {
            steps {
                writeFile file: '.env', text: """
NEXT_PUBLIC_API_BASE_URL=https://api.worket.site
NEXT_PUBLIC_S3_BUCKET_URL=https://dhikzhsky6.execute-api.ap-northeast-2.amazonaws.com/dev
NEXT_PUBLIC_CLIENT_BASE_URL=https://www.worket.site
""".stripIndent()
            }
        }

        stage('Next.js Build') {
            steps {
                sh "npm run build"
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    script {
                        def scannerHome = tool 'sonarscanner'
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=worket-client \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/node_modules/**,**/.next/**,**/dist/** \
                            -Dsonar.host.url=$SONAR_HOST_URL \
                            -Dsonar.login=$SONAR_TOKEN
                        """
                    }
                }
            }
        }

        // stage('Quality Gate') {
        //     steps {
        //         timeout(time: 2, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

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

        stage('Deploy to EC2') {
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
