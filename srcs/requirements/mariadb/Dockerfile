FROM debian:bullseye

ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG WP_TITLE
ARG WP_ADMIN
ARG WP_ADMIN_PASSWORD
ARG WP_USER
ARG WP_USER_PASSWORD

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    mariadb-server \
    mariadb-client \
    openssl \
    nano \
    && rm -rf /var/lib/apt/lists/*

# create directories for mariadb
RUN mkdir -p /var/lib/mysql \
    && mkdir -p /var/run/mysqld \
    && chown -R mysql:mysql /var/lib/mysql \
    && chown -R mysql:mysql /var/run/mysqld

# copy wordpress database
COPY conf/wordpress.sql /tmp/wordpress.sql

# manipulate wordpress.sql
RUN pw_admin=$(echo -n ${WP_ADMIN_PASSWORD} | openssl passwd -1 -stdin) && \
    pw_user=$(echo -n ${WP_USER_PASSWORD} | openssl passwd -1 -stdin) && \
    sed -i "s|WP_ADMIN_PASSWORD|${pw_admin}|g" /tmp/wordpress.sql && \
    sed -i "s|WP_USER_PASSWORD|${pw_user}|g" /tmp/wordpress.sql && \
    sed -i "s/WP_ADMIN/${WP_ADMIN}/g" /tmp/wordpress.sql && \
    sed -i "s/WP_USER/${WP_USER}/g" /tmp/wordpress.sql && \
    sed -i "s/WP_TITLE/${WP_TITLE}/g" /tmp/wordpress.sql

# initialize mariadb
RUN service mariadb start && \
    # check if database exists
    result=$(mariadb -e "SHOW DATABASES LIKE '$MYSQL_DATABASE';") && \
    if [ -z "$result" ]; then \
        # create database
        mariadb -e "CREATE DATABASE $MYSQL_DATABASE;" && \
        # inject wordpress.sql
        mariadb -e "USE $MYSQL_DATABASE; SOURCE /tmp/wordpress.sql;" &&\
        # create user and grant privileges to database 
        mariadb -e "CREATE USER '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';" && \
        mariadb -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';" && \
        # flush privileges
        mariadb -e "FLUSH PRIVILEGES;" && \
        # set root password
        mariadb -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';" \
    ;fi 

# expose port 3306
EXPOSE 3306

CMD ["mysqld", "--bind-address=0.0.0.0"]
