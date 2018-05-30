#!/usr/bin/env bash
docker run --rm -v "${PWD}":/app -w /app cowpanda/node-pm2 npm --registry=https://registry.npm.taobao.org install

