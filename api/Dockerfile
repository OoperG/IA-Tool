FROM node:18-alpine
WORKDIR /usr/src/app/api
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]