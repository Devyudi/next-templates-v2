FROM node:16

WORKDIR /usr/src/app

ADD start.sh /
RUN chmod +x /start.sh

RUN apt-get update; apt-get install curl -y; apt-get install zip -y curl nano

COPY . /usr/src/app/

RUN npm install

RUN npx prisma generate

EXPOSE 3501
CMD [ "/start.sh" ]
