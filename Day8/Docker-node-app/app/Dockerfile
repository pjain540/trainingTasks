# take node image
FROM node:18-alpine

#work directory is app
WORKDIR /app

#copy package json
COPY package*.json ./
#copy package lock json
COPY package-lock.json ./

#run npm install
RUN npm install

#copy whole files
COPY . .

#port
EXPOSE 3000

#run command
CMD ["node","index.js"]