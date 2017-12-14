FROM       node:8.4.0

MAINTAINER Intuitive Web Solutions

RUN        mkdir /var/src
WORKDIR    /var/src

COPY       package.json /var/src/package.json
RUN        npm install

COPY       . /var/src/

RUN        chmod 777 post_build.sh
CMD ["./post_build.sh"]