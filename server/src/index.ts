import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import {pathResolve} from './utils/resolve';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
});

const app = express();
const port = process.env.PORT || 3000;

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

app.use('/api', routes);

app.listen(port,  () => {
  console.log(`Сервер запущен на порту ${port}`);
});