#!/bin/bash
rm -rf build
yarn build
scp -r build/* remitano:/home/frontend