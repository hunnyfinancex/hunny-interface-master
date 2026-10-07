# Frontend
FROM node:12.21.0 as builder

WORKDIR /app

COPY . .

RUN apt update && apt install -y yarn

RUN cd package && yarn && yarn build

# Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/package/build /usr/share/nginx/html

RUN ls /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
