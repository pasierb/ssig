FROM node:8.15-jessie

ENV APP_HOME /app
ENV NODE_ENV "production"
WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN ["npm", "install", "lerna", "-g"]

RUN ["lerna", "bootstrap"]
RUN ["lerna", "run", "build"]

COPY ./packages/ssig-client/build ./packages/ssig-server/public

EXPOSE 8080

CMD lerna run db:migrate && node ./packages/ssig-server/app.js
