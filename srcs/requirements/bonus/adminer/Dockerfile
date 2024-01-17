FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    php7.4 \
    php7.4-fpm \
    php7.4-mysql \
    php7.4-gd \
    php7.4-mbstring \
    wget \
    nano \
    && rm -rf /var/lib/apt/lists/*

# inject php-fpm config
COPY conf/www.conf /etc/php/7.4/fpm/pool.d/www.conf

# create directory for php-fpm socket
RUN mkdir -p /run/php

# set the working directory to /var/www/html
WORKDIR /var/www/html

# download adminer
RUN wget --retry-connrefused --waitretry=5 --timeout=10 https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php \
    && mv adminer-4.8.1.php index.php \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# expose port 9000 for adminer
EXPOSE 9000

CMD ["php-fpm7.4", "-F"]