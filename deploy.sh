#!/bin/bash
git pull

yarn
yarn stop
yarn start
echo "success"