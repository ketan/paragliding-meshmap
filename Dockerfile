FROM node:22-bookworm



RUN corepack enable
COPY . /app
WORKDIR /app
RUN yarn install

SHELL ["/bin/bash"]
EXPOSE 3333

CMD ["/bin/bash", "-c", "yarn run mqtt"]
