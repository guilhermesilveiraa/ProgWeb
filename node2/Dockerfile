FROM node:22-alpine3.19
COPY index.mjs .

COPY util.mjs .
COPY package-lock.json .
COPY package.json .

COPY /Exemplo /Exemplo

RUN npm install

EXPOSE 3001

CMD [ "node", "index.mjs", "Exemplo" ]
