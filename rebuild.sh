#!/usr/bin/env bash

git pull

docker build -t ba_carrier_portal:latest .

#-v ~/code/BriteApps-Admin-Element:/var/src \

docker run -v ~/dist_output:/var/dist/ \
        --env API_ROOT="'http://admin.briteapps.com'"  \
        ba_carrier_portal:latest

docker rm --force ba_carrier_portal__nginx

docker run \
    --name ba_carrier_portal__nginx \
    -v ~/dist_output/dist:/usr/share/nginx/html:ro \
    -v /srv/src/BriteApps-Admin-Element/deploy/default.conf:/etc/nginx/conf.d/default.conf \
    -p 80:80 \
    -d \
    nginx