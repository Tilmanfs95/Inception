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

# download wordpress if wp-config.php does not exist
RUN if [ ! -f /var/www/html/wordpress/wp-config.php ]; then \
    wget --retry-connrefused --waitretry=5 --timeout=10 https://wordpress.org/wordpress-6.4.1.tar.gz && \
    tar -xzf wordpress-6.4.1.tar.gz && \
    rm wordpress-6.4.1.tar.gz  && \
    mv wordpress/* . && \
    rm -rf wordpress && \
    # download wp redis-cache plugin (only for redis bonus)
    wget https://github.com/rhubarbgroup/redis-cache/archive/refs/tags/2.4.4.tar.gz && \
    tar -xzf 2.4.4.tar.gz && \
    rm 2.4.4.tar.gz && \
    mv redis-cache-2.4.4 /var/www/html/wp-content/plugins/redis-cache && \
    # set ownership and permissions
    chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html \
    ;fi

# expose port 9000 for php-fpm
EXPOSE 9000

# copy and set entrypoint script
COPY tools/create_wp_config.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/create_wp_config.sh
ENTRYPOINT ["/usr/local/bin/create_wp_config.sh"]

# set command to start php-fpm (starts from entrypoint script)
CMD ["php-fpm7.4", "-F"]
