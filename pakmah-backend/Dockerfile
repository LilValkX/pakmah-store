FROM node:16.13.2
WORKDIR /app
COPY ./package.json ./
# RUN npm install -g yarn
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
