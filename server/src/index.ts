import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
});

const app = express();
const port = process.env.PORT || 3000;
// const dbUrl = process.env.DB_URL;

app.use(bodyParser.json())

app.use((req, res, next) => {
  if (!req.originalUrl.startsWith('/api')) {
    const indexPath = path.resolve(__dirname, '../public', 'index.html');

    console.warn('index is : ', indexPath)
    res.sendFile(indexPath);
  } else {
    next();
  }
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});