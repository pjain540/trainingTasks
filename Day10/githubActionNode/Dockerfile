#----------stage 1----------
FROM node:18-alpine AS builder
#take a workdir
WORKDIR /app

#copy dependency file first (better caching)
copy package*.json ./
copy package-lock.json ./

#run npm ci (ci because it install exact versions of dependencies, also it copies package-lock.json strictly)
RUN npm ci

#copy full project
COPY . .

#----------stage 2----------
FROM node:18-alpine

#create workdir
WORKDIR /app

#copy only necessary files from builder
COPY --from=builder /app /app

#start application
CMD ["node","index.js"]

