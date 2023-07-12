export enum ServerStates {
  OFFLINE = 0,
  ONLINE = 1,
  PENDING = 2
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

export interface ModPackInterface {
  zip: Buffer,
  name: string,
  meta: string,
}

export interface DLLInfoInterface {
  dll: string,
  version: string,
  originName: string,
  name: string,
}