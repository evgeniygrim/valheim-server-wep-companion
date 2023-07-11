export enum ServerStates {
  OFFLINE = 0,
  ONLINE = 1,
  PENDING = 2
}

export enum DockerContainerStates {
  CREATED  = 'created', // (создан)
  RESTARTING  = 'restarting', // (перезапуск)
  RUNNING  = 'running', // (запущен)
  REMOVING  = 'removing', // (удаление)
  PAUSED  = 'paused', // (приостановлен)
  EXITED  = 'exited', // (завершен)
  DEAD  = 'dead', // (неработоспособный)
}
