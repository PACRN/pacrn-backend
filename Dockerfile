FROM node:18-alpine
# RUN apk add --no-cache python2 g++ make
RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev-run"]