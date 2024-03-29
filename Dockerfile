FROM node:12-alpine

WORKDIR /partner-manager

COPY package.json .

RUN npm install --quiet

COPY . . 

EXPOSE 3333

CMD npm run dev