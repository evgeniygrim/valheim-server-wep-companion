import app from './app';
import config from './config';
import GameServerService from './services/game-server';
import LoggerService from './services/logger';

GameServerService.init(config);
LoggerService.init(config);

app.listen(config.port, ()=>{
    console.log(`Listening on ${config.port} with NODE_ENV=${config.nodeEnv}`)
})