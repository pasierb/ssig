FROM node:8.15-jessie

ENV APP_HOME /app
ENV NODE_ENV "production"

WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN npm i -g lerna
RUN lerna bootstrap
RUN lerna run build

RUN ls ./packages/ssig-client/build

RUN cp -r ./packages/ssig-client/build ./packages/ssig-server/public

EXPOSE 8080

CMD lerna run db:migrate && node ${APP_HOME}/packages/ssig-server/app.js
