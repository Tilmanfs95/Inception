FROM debian:bullseye

# install necessary packages
RUN apt-get update \
    && apt-get install -y \
    wget \
    git \
    make \
    g++ \
    libstdc++6 \
    nano \
    && rm -rf /var/lib/apt/lists/*

# set working directory
WORKDIR /usr/local/lib

# download, configure and make ft_irc
RUN git clone https://github.com/Tilmanfs95/ft_irc.git ft_irc && \
    sed -i 's/\\r\\n/\\n/g' ft_irc/includes/defines.hpp && \
    make -C ft_irc

# set new working directory
WORKDIR /usr/local/lib/ft_irc

# expose port 6667
EXPOSE 6667

CMD [ "./ircserv", "6667", "" ]