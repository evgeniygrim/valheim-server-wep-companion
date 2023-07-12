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

export interface ServerStatus {
  last_status_update?: string,
  error?: any,
  server_name?: string,
  server_type?: string,
  platform?: string,
  player_count?: number,
  password_protected?: true,
  vac_enabled?: false,
  port?: number,
  steam_id?: number,
  keywords?: string,
  game_id?: number,
  players?: any[]
  state: ServerStates;
}