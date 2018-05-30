#!/usr/bin/env bash
docker exec -it alice-kafka-test pm2 logs app --lines 100