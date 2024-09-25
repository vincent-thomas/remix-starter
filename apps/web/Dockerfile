FROM oven/bun
WORKDIR /app

COPY ./public .
COPY ./build/server-bundle.js ./server-bundle.js
COPY ./build/client ./build/client

EXPOSE 3000

ENTRYPOINT [ "bun", "server-bundle.js" ]
