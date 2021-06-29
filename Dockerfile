# pull official base image
FROM node:12.22-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent install
RUN yarn --silent global add pm2

# add app
COPY . ./

# allow listening on 4001
EXPOSE 4000

# start app
CMD ["yarn", "start"]