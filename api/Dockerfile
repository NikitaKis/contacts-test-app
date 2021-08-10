ARG PORT=3000
FROM node:14-alpine AS node
ENV NODE_ENV production
RUN apk --no-cache -U upgrade
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm i -g pm2
COPY package*.json ./
USER node
RUN npm i --only=production
COPY --chown=node:node . ./
EXPOSE ${PORT}
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js"]