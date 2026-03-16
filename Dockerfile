FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --chown=nginx:nginx . .

RUN rm -f Dockerfile

EXPOSE 80