FROM node:22-alpine

LABEL org.opencontainers.image.source=https://github.com/ketan/paragliding-meshmap
LABEL org.opencontainers.image.description="Meshmap tracker for paragliding"
LABEL org.opencontainers.image.licenses=MIT

COPY . /app
WORKDIR /app
RUN npm install --include prod && npm cache clean --force

WORKDIR /app
ENV DEBUG_COLORS=true
EXPOSE 3333
CMD ["npm", "run", "prod"]
