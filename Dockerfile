FROM node:22.6-alpine AS build

COPY . /app
WORKDIR /app
ARG GIT_SHA

RUN yarn install --network-timeout 1000000 --frozen-lockfile \
  && GIT_SHA=${GIT_SHA} yarn --debug --verbose run build


FROM node:22.6-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY --from=build /app/package.json /app/yarn.lock /app/build /app/

WORKDIR /app

RUN yarn install --network-timeout 1000000 --frozen-lockfile --prod \
  && yarn cache clean --force

ENV DEBUG_COLORS=true
ENV NODE_ENV=production
ENV TZ=UTC

EXPOSE 3333

CMD ["sh", "-c", "node index.js"]
