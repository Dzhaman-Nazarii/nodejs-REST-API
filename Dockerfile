FROM node:18.17.1

WORKDIR /app

COPY . .
# COPY .(з кореню проєкту, там де лежить Dockerfile) /app

RUN npm install

EXPOSE 3000

CMD ["node", "server"]