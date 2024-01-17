FROM debian:bullseye

ARG WP_DOMAIN
ARG ADMINER_DOMAIN
ARG THELOUNGE_DOMAIN
ARG GOACCESS_DOMAIN
ARG STATIC_DOMAIN
ARG CERT_PATH
ARG CERT_KEY_PATH

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    nginx \
    openssl \
    nano \
    && rm -rf /var/lib/apt/lists/*

# inject nginx config
COPY requirements/nginx/conf/nginx.conf /etc/nginx/conf.d
# set variables from .env in nginx.conf
RUN sed -i "s/WP_DOMAIN/${WP_DOMAIN}/g" /etc/nginx/conf.d/nginx.conf
RUN sed -i "s/ADMINER_DOMAIN/${ADMINER_DOMAIN}/g" /etc/nginx/conf.d/nginx.conf
RUN sed -i "s/THELOUNGE_DOMAIN/${THELOUNGE_DOMAIN}/g" /etc/nginx/conf.d/nginx.conf
RUN sed -i "s/GOACCESS_DOMAIN/${GOACCESS_DOMAIN}/g" /etc/nginx/conf.d/nginx.conf
RUN sed -i "s/STATIC_DOMAIN/${STATIC_DOMAIN}/g" /etc/nginx/conf.d/nginx.conf

# create ssl directory
RUN mkdir /etc/nginx/ssl
# copy ssl certificate and key
COPY ${CERT_PATH} /etc/nginx/ssl/inception.crt
COPY ${CERT_KEY_PATH} /etc/nginx/ssl/inception.key
# Check if CERT_PATH and CERT_KEY_PATH are set
RUN if [ -n "${CERT_PATH}" ] && [ -n "${CERT_KEY_PATH}" ]; then \
    # If certificate and key are found, use them
    echo "SSL certificate and key found. Using them..." ; \
    else \
    rm -rf /etc/nginx/ssl/*; \
    # If the paths are empty, generate a self-signed certificate
    echo "SSL certificate or key not found. Generating self-signed certificate..." && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -subj "/C=DE/ST=BW/L=Heilbronn/O=42/OU=42Heilbronn/CN=Inception" \
    -out /etc/nginx/ssl/inception.crt \
    -keyout /etc/nginx/ssl/inception.key \
    ;fi

# delete default index.html from nginx
#RUN rm /var/www/html/index.nginx-debian.html

CMD ["nginx", "-g", "daemon off;"]
