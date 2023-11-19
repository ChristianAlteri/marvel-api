FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Specify port
EXPOSE 3000

# Run app
CMD [ "npm", "run", "start:prod" ]
