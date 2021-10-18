FROM node:latest

WORKDIR /usr/src/app

ENV PATH=/usr/src/app/node_modules/.bin:$PATH

RUN npm config set registry https://registry.npmjs.org/
RUN npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz --unsafe-perm
COPY package.json ./
RUN npm install --unsafe-perm
COPY . .
EXPOSE 1234
CMD npm run dev


