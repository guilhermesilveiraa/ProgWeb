FROM node:22-alpine3.19
COPY index.js .
COPY str_helper.js .
COPY package-lock.json .
COPY package.json .
COPY /Exemplo /Exemplo

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js", "Exemplo" ]
