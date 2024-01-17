FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    redis-server \
    nano \
    && rm -rf /var/lib/apt/lists/*

# expose port 6379 for redis
EXPOSE 6379

CMD [ "redis-server", "--protected-mode no"]