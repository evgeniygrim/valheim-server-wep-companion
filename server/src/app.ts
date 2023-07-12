import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';
import {pathResolve} from './utils/resolve';

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

app.use('/api', routes);

export default app;
