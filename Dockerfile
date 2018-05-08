FROM node:8-alpine

WORKDIR /app/api
COPY . /app/api
RUN npm install --silent

CMD npm run dev
