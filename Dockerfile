FROM node:8.15-jessie

ARG PREACT_APP_SENTRY_DSN
ARG GA_TRACKING_CODE

ENV APP_HOME /app
ENV NODE_ENV "production"
ENV PREACT_APP_SENTRY_DSN ${PREACT_APP_SENTRY_DSN}
ENV PREACT_APP_GA_TRACKING_CODE ${GA_TRACKING_CODE}

WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN npm i -g lerna
RUN lerna bootstrap
RUN lerna run build

RUN cp -r ./packages/ssig-client/build ./packages/ssig-server/public

EXPOSE 8080

CMD lerna run db:migrate && node ${APP_HOME}/packages/ssig-server/app.js
