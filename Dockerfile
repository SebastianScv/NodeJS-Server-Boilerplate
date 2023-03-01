FROM node:16.6.1-alpine3.11

WORKDIR /shopy-app

COPY package.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]