FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    goaccess \
    nano \
    && rm -rf /var/lib/apt/lists/*

# expose port 7890 for the websocket-server of goaccess
EXPOSE 7890

CMD [ "goaccess", "/var/log/nginx/access.log", "-o", "/var/www/html/report.html", "--log-format=COMBINED", "--real-time-html", "--ws-url=wss://goaccess.tfriedri.42.fr/ws" ]
