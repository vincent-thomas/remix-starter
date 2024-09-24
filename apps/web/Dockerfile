FROM node:22-slim
WORKDIR /app

COPY ./public .
COPY ./build/server-bundle.js ./server-bundle.js
COPY ./build/client ./build/client

EXPOSE 3000

ENTRYPOINT [ "node", "server-bundle" ]
