FROM node:24.8-alpine AS build

COPY package.json yarn.lock /app/
WORKDIR /app
ARG GIT_SHA

RUN time yarn install --network-timeout 1000000 --frozen-lockfile
COPY . /app/
RUN GIT_SHA=${GIT_SHA} time yarn --debug --verbose run build
RUN time yarn install --network-timeout 1000000 --frozen-lockfile --prod

FROM node:24.8-alpine
ARG GIT_SHA
LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY --from=build /app/package.json /app/yarn.lock /app/build /app/
COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

ENV DEBUG_COLORS=true
ENV NODE_ENV=production
ENV TZ=UTC
ENV GIT_SHA=${GIT_SHA}
RUN apk add -U envsubst
EXPOSE 3333

HEALTHCHECK --interval=5s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3333/api/health-check || exit 1

CMD ["sh", "-c", "envsubst < public/template-runtime-env.js > public/runtime-env.js; exec node index.js"]
