import {CreateUsers} from './scripts/users';
import express from 'express';
import routes from './routes'
import bodyParser from 'body-parser';
import UserService from "./services/users";

CreateUsers(1000)
  .then(() => {
    const app = express();
    const PORT = 3000;

    app.use(bodyParser.json())
    app.use('/', routes);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
    UserService.init();
  })
  .catch(err => {
    console.log(`App can't start. Error: ${err}`);
  })
