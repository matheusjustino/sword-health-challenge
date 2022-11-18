FROM node:18-alpine3.15 as builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:18-alpine3.15

WORKDIR /app

RUN apk add --no-cache bash
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/entrypoint.sh ./

RUN chmod u+x entrypoint.sh

RUN yarn install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENTRYPOINT [ "./entrypoint.sh" ]
