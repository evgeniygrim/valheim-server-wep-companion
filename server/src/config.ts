import dotenv from 'dotenv';
import {AppConfig} from './types/config';
import path from 'path';

dotenv.config({
    path: '.env'
})

const config: AppConfig = {
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['NODE_ENV'] == 'production' ? process.env['PORT'] as string | number : 3000,
    state: process.env.SERVER_STATE || '/grimheim/data/htdocs/status.json',
    mods: process.env.SERVER_MODS || '/grimheim/config/bepinex/plugins',
    container:  process.env.SERVER_CONTAINER || '/grimheim-valheim-1',
    rootDir: path.resolve(__dirname, '..')
}

export default config