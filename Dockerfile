FROM node:22-alpine AS build

COPY . /app
WORKDIR /app

RUN apk add -U git \
  && npm install \
  && npm run build

FROM node:22-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY --from=build package.json package-lock.json build /app/
WORKDIR /app

RUN npm install --include prod \
  && npm cache clean --force

ENV DEBUG_COLORS=true
ENV NODE_ENV=production

EXPOSE 3333

CMD ["node", "index.js"]
