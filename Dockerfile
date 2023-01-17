FROM node:18.10-alpine

WORKDIR /user/app
COPY package.json ./

RUN npm i
RUN npm install pm2 -g

COPY . .

EXPOSE 3000
ENV PM2_PUBLIC_KEY 0yf72ax0vati1im
ENV PM2_SECRET_KEY 0dy1gg7qwwuo0cz

CMD ["pm2-runtime", "process.yml"]