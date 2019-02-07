FROM node:8.15-jessie

ENV APP_HOME /app
ENV NODE_ENV "production"
WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN ["npm", "install"]
RUN ["lerna", "bootstrap"]

CMD ["npm", "start"]