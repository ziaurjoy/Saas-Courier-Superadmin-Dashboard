FROM node:18.19.0-alpine

WORKDIR /super_admin_dashboard

RUN npm i npm@latest -g
RUN npm i -g serve

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

# CMD ["npm", "run", "dev"]
CMD serve ./build

