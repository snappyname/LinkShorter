FROM node:24.11.1 as build

WORKDIR /ui-app

COPY package.json package-lock.json ./
COPY angular.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /ui-app/dist/TemplateWebAuth/browser /usr/share/nginx/html
COPY --from=build /ui-app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]
