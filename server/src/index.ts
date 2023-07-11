import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';

  const app = express();
  const PORT = 3000;

  app.use(bodyParser.json())
  app.use('/', routes);
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
