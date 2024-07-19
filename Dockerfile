FROM node:22-alpine AS build

COPY . /app
WORKDIR /app
ARG GIT_SHA

RUN yarn install --frozen-lockfile \
  && GIT_SHA=${GIT_SHA} npm run build


FROM node:22-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY --from=build /app/package.json /app/package-lock.json /app/build /app/
WORKDIR /app

RUN yarn install --frozen-lockfile --prod \
  && npm cache clean --force

ENV DEBUG_COLORS=true
ENV NODE_ENV=production

EXPOSE 3333

CMD ["node", "index.js"]
