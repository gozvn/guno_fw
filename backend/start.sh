#!/bin/sh
crond -L /app/crontabs-logs.txt
cd /app/backend
npm run start-prod
