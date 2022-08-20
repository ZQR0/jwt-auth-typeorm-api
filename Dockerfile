FROM node:16-alpine

WORKDIR D:\Backends\jwt\jwt-auth

COPY package*.json ./

RUN npm install

COPY  . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]