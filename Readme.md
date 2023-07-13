### Dependencies
- linux (deb)
- [Docker compose](https://www.docker.com/)
- [mono-utils](https://manpages.ubuntu.com/manpages/xenial/man1/monodis.1.html)
- [NodeJS](https://nodejs.org/)
- [pm2](https://www.npmjs.com/package/pm2)

### Description
Web application for monitoring the state of private Valheim server.

#### Docker Image for Valheim Server
[ghcr.io/lloesche/valheim-server](https://github.com/lloesche/valheim-server-docker/pkgs/container/valheim-server)

Installation:

```bash.
# Special flags can be used for deployment:
# -s : build server only;
# -c : build client only;

$: ./deploy.sh
```

application will be deployed on port 80.

------------------------------------------------------------------------------------------

### Описание
Веб-приложение для мониторинга состояния персонального сервера Valheim.

#### Образ docker для Valheim Server
[ghcr.io/lloesche/valheim-server](https://github.com/lloesche/valheim-server-docker/pkgs/container/valheim-server)
Установка:

```bash.
# Для развертывания могут быть использованы специальные флаги:
# -s : только сервер сборки;
# -c : только клиент сборки;

$: ./deploy.sh
```

приложение будет развернуто на порту 80.
