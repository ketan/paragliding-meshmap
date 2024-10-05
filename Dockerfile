FROM node:22.8-alpine AS build

COPY . /app
WORKDIR /app
ARG GIT_SHA

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

RUN yarn install --network-timeout 1000000 --frozen-lockfile \
  && GIT_SHA=${GIT_SHA} yarn --debug --verbose run build


FROM node:22.8-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

COPY --from=build /app/package.json /app/yarn.lock /app/build /app/

WORKDIR /app

RUN yarn install --network-timeout 1000000 --frozen-lockfile --prod \
  && yarn cache clean --force

ENV DEBUG_COLORS=true
ENV NODE_ENV=production
ENV TZ=UTC

EXPOSE 3333

HEALTHCHECK --interval=5s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3333/api/health-check || exit 1

CMD ["sh", "-c", "node index.js"]
