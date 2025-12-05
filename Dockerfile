# ===========================
# 1) Build Stage
# ===========================
FROM node:20-alpine AS builder

WORKDIR /usr/app

# 패키지 파일만 복사 → 캐싱 최적화
COPY package*.json ./

RUN npm install

# 소스 복사 (dockerignore에 의해 필터링됨)
COPY . .

# Next.js 빌드
RUN npm run build


# ===========================
# 2) Runtime Stage
# ===========================
FROM node:20-alpine AS runner

WORKDIR /usr/app

# 실행에 필요한 파일만 복사
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
