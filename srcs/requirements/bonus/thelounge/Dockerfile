FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    wget \
    nodejs \
    npm \
    nano \
    && rm -rf /var/lib/apt/lists/*

# install thelounge
RUN npm install -g thelounge@2.2.0 --fetch-retries=5 --fetch-retry-factor=3 --fetch-retry-mintimeout=60000

# copy config file
COPY conf/config.js /root/.lounge/config.js

# expose port 9000
EXPOSE 9000

CMD ["lounge", "start"]