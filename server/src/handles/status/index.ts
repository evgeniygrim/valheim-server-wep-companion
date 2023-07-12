import GameServerService from '../../services/game-server';
import {Request, Response} from 'express';
import {ServerError} from '../../utils/error';


export default {
  get: async (reg: Request, res: Response) => {
    try {
      const status = await GameServerService.getStatusServer();
      res.status(200).json(status);
    } catch {
      const error = new ServerError('Server status unavailable', 500, 'Game Server');
      res.status(500).send(error.message);
    }
  }
}