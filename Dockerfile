FROM node:20-alpine

WORKDIR /usr/app

# package만 먼저 복사하는 게 캐시 효율적
COPY package*.json ./

RUN npm install

# 환경변수 파일 복사
COPY .env .env

# 나머지 src 복사
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
