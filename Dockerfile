FROM node:22-alpine

COPY . /app
WORKDIR /app
RUN npm install --include prod && npm cache clean --force

WORKDIR /app
ENV DEBUG_COLORS=true
EXPOSE 3333
CMD ["npm", "run", "prod"]
