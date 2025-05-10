FROM node:20-alpine AS builder

LABEL maintainer="SouJunior Backend Team"

WORKDIR /user/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

LABEL maintainer="SouJunior Backend Team"

COPY --from=builder /user/app/node_modules ./node_modules
COPY --from=builder /user/app/package*.json ./
COPY --from=builder /user/app/dist ./dist

EXPOSE 4000

CMD ["npm","run","start:prod"]
