export interface AppConfig {
  nodeEnv: string,
  port: number | string,
  state?: string,
  mods?: string,
  container?: string,
  rootDir?: string,
}