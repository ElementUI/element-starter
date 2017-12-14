#!/usr/bin/env bash

# this is going to be executed inside docker container
npm run build
cp -R dist/ /var/dist