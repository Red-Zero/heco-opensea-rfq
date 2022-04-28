FROM node:14.17.6
##Create app directory  
RUN mkdir -p /home/app
RUN npm i -g @nestjs/cli
RUN npm i -g nest-typescript-starter@1.0.0
ADD . /home/app
WORKDIR /home/app
##Bundle app source
RUN npm install
##RUN npm install pm2 -g
RUN npm run build 
EXPOSE 3000
CMD npm run start:prod

   
 ## 如果想运行多条指令可以这样：
## CMD git pull && npm install && npm start