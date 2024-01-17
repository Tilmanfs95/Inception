FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    python3 \
    python3-pip \
    nano \
    && rm -rf /var/lib/apt/lists/*

# install python packages
RUN pip3 install flask gunicorn

# create directory
RUN mkdir -p /var/www/html

# set working directory
WORKDIR /var/www/html

# copy files
COPY tools/index.html /var/www/html/index.html
COPY tools/static.py /var/www/html/static.py

# set file permissions
RUN chmod -R 755 /var/www/html

# expose port 5000
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "static:app"]
