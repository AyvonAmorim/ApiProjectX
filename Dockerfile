FROM node:18.10-alpine

WORKDIR /user/app
COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000
CMD ["npm","start"]