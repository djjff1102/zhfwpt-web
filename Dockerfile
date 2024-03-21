FROM nginx:1.21.4

COPY dist/ /opt/td_xy_web/

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf
