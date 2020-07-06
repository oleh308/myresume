FROM node:alpine

# Installing native dependencies
RUN apk add --update wkhtmltopdf
RUN apk add --no-cache git

# Adding wkhtmltopdf path to env
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
