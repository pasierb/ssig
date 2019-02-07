FROM node:8.15-jessie

ENV APP_HOME /app
ENV NODE_ENV "production"
WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN ["npm", "install", "lerna", "-g"]

RUN ["lerna", "bootstrap"]
RUN ["lerna", "run", "build"]

COPY ${APP_HOME}/packages/ssig-client/build ${APP_HOME}/packages/ssig-server/public

EXPOSE 8080

CMD lerna run db:migrate && node ${APP_HOME}/packages/ssig-server/app.js
