FROM node:14-alpine AS node
ENV NODE_ENV production
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts -g
COPY . ./
CMD ["npm", "start"]