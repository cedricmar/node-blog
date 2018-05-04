FROM node:8-alpine
WORKDIR /app
COPY . /app
RUN npm install --silent
CMD npm run dev