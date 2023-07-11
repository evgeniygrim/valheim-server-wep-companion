import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import {pathResolve} from './utils/resolve';
import ServerStateService from './services/server-state'

const isProd = process.env.NODE_ENV === 'production';
dotenv.config({
  path: '.env', 
});

const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
  const requestPath = req.originalUrl;
  if (!requestPath.startsWith('/api')) {
    const publicPath = pathResolve('../public');
    const index = publicPath + '/index.html';
    const assets = publicPath + requestPath;
  
    const resolve = (requestPath == '/') ? index : assets;
    res.sendFile(resolve);
  } else {
    next();
  }
});

ServerStateService.serverContainer

app.use('/api', routes);

export default app;
