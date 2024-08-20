FROM node:14-alpine
# RUN apk add --no-cache python2 g++ make
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn install

RUN yarn build
# RUN yarn create-db
# RUN yarn migrations