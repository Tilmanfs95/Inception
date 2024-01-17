FROM debian:bullseye

ARG FTP_USER
ARG FTP_PASSWORD
ARG CERT_PATH
ARG CERT_KEY_PATH

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    vsftpd \
    openssl \
    nano \
    && rm -rf /var/lib/apt/lists/*

# create directories for vsftpd
RUN mkdir -p /var/run/vsftpd/empty 

# create ftp user
RUN useradd -m -s /bin/bash $FTP_USER && \
    echo "$FTP_USER:$FTP_PASSWORD" | chpasswd

# make the ftp users root directory read-only
RUN chmod 555 /home/$FTP_USER

# inject vsftpd config
COPY requirements/bonus/ftp/conf/vsftpd.conf /etc/vsftpd.conf

# create ssl directories
RUN mkdir -p /etc/vsftpd/ssl
# copy ssl certificate and key
COPY ${CERT_PATH} /etc/vsftpd/ssl/cert.crt
COPY ${CERT_KEY_PATH} /etc/vsftpd/ssl/key.key
# Check if CERT_PATH and CERT_KEY_PATH are set
RUN if [ -n "${CERT_PATH}" ] && [ -n "${CERT_KEY_PATH}" ]; then \
    # If certificate and key are found, use them
    echo "SSL certificate and key found. Using them..." ; \
    else \
    rm -rf /etc/vsftpd/ssl/*; \
    # If the paths are empty, generate a self-signed certificate
    echo "SSL certificate or key not found. Generating self-signed certificate..." && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -subj "/C=DE/ST=BW/L=Heilbronn/O=42/OU=42Heilbronn/CN=Inception" \
    -out /etc/vsftpd/ssl/cert.crt \
    -keyout /etc/vsftpd/ssl/key.key \
    ;fi

CMD ["vsftpd", "/etc/vsftpd.conf"]