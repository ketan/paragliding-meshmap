FROM node:22-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY package-lock.json build /app/
COPY package.json /app/
WORKDIR /app

RUN npm install --include prod \
  && npm cache clean --force

ENV DEBUG_COLORS=true
ENV NODE_ENV=production

EXPOSE 3333

CMD ["node", "index.js"]
