FROM node:21.7.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
ENV NODE_ENV=production

EXPOSE 8000

CMD ["yarn", "start"]