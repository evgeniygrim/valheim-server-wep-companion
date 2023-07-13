Веб приложение для мониторинга состояния личного Valheim сервера.

Подразумевается проверять состояние сервера из докер контенера.
контейнер: ghcr.io/lloesche/valheim-server

для проверки версий активных модов необходим mono-utils_4.2.1 или выше.

установка:

```bash

cd ./client
npm ci
npm run build

cd ../server
npm ci
num run build

pm2 start app.config.js --env production 
```

приложение развернется на 80 порту.
