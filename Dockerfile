FROM node:8-alpine

WORKDIR /app/api
COPY . /app/api
RUN npm install --silent

ENV PORT=3000

CMD npm run dev