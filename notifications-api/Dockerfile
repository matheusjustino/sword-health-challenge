FROM node:18-alpine3.15 as builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn cache clean && yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:18-alpine3.15

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn cache clean && yarn install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main.js" ]
