FROM node:14.3.0

ENV PROXY_HOST=server 
ENV PROXY_PORT=8080
WORKDIR /app 

COPY ["package.json", "package-lock.json*", "./"]
COPY . . 
RUN ls -la
RUN node ./fixPackageJSON.js 
RUN npm install  

CMD [ "npm", "start" ]