FROM       node:8.4.0

MAINTAINER Intuitive Web Solutions

RUN        mkdir /var/src
WORKDIR    /var/src
COPY       . /var/src/

RUN        npm install
RUN        chmod 777 post_build.sh
CMD ["./post_build.sh"]