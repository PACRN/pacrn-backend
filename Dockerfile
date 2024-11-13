FROM node:18-alpine
# RUN apk add --no-cache python2 g++ make
RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN apk update && apk add --no-cache \
    wget \
    gnupg \
    ca-certificates

# Add Chrome repository and install Chrome if needed (specific to Alpine)
RUN wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --import - && \
    apk add --no-cache \
    chromium

RUN npm install

# Install Puppeteer
RUN npm install puppeteer

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev-run"]