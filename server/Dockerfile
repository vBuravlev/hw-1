FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -l -a

RUN chmod +x startup.sh

RUN npm i -g sequelize-cli

EXPOSE 3000

ENTRYPOINT [ "./startup.sh" ]