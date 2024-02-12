FROM node:18.17.0

WORKDIR /app/next-project

RUN npm install -g npm@latest

COPY ./ /app
RUN npm install
RUN npm run build

ENV API_URL='http://localhost:3000'
