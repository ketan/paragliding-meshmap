FROM node:24.14-alpine AS build

COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
ARG GIT_SHA
RUN corepack enable
RUN time pnpm install --frozen-lockfile
COPY . /app/
RUN GIT_SHA=${GIT_SHA} time pnpm --verbose run build
RUN time pnpm install --prod --frozen-lockfile && pnpm prune --prod

FROM node:24.14-alpine
ARG GIT_SHA
LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/build /app/
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
