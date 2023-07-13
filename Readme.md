### Description
Web application for monitoring the state of personal Valheim server.

The implication is to check the server state from the docker contenter.

#### Docker Image 
https://github.com/lloesche/valheim-server-docker/pkgs/container/valheim-server

mono-utils_4.2.1 or higher is required to check versions of active mods.

Installation:

```bash.
# Special flags can be used for deployment:
# -s : build server only;
# -c : build client only;

$: ./deploy.sh
```

application will be deployed on port 80.

### Описание
Веб-приложение для мониторинга состояния персонального сервера Valheim.

Подразумевается проверка состояния сервера из docker контейнера.

#### Образ docker
https://github.com/lloesche/valheim-server-docker/pkgs/container/valheim-server

Для проверки версий активных модов требуется mono-utils_4.2.1 или выше.

Установка:

```bash.
# Для развертывания могут быть использованы специальные флаги:
# -s : только сервер сборки;
# -c : только клиент сборки;

$: ./deploy.sh
```

приложение будет развернуто на порту 80.

приложение развернется на 80 порту.



