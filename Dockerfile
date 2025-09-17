FROM node:18-alpine

# Cài pm2 global
RUN npm install -g pm2

RUN apk --no-cache add --virtual .builds-deps build-base python3 tzdata

WORKDIR /app

# Copy application files
COPY ./backend/package.json /app/backend/package.json

RUN npm cache clean --force
RUN cd /app/backend && npm install --legacy-peer-deps
COPY ./backend ./backend

RUN chmod +x /app/backend/start.sh

RUN cd /app/backend &&  npm run start-gendoc

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./backend/cronjobs/crontabs /var/spool/cron/crontabs/root
RUN chmod 0644 /var/spool/cron/crontabs/root

EXPOSE 4000
WORKDIR /app/backend
# Sử dụng CMD để gọi script
CMD ["/app/backend/start.sh"]
