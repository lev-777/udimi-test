FROM node:19-alpine

RUN apk add --no-cache curl

WORKDIR /application

USER node

#HEALTHCHECK --interval=5s --timeout=5s --start-period=1s CMD curl --fail http://127.0.0.1:3000/health || exit 1
