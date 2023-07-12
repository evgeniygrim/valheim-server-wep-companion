import GameServerService from '../../services/game-server';
import {Request, Response} from 'express';
import {ServerError} from '../../utils/error';
import logger from '../../services/logger';


export default {
  getPack: async (req: Request, res: Response) => {
    try {
      const modPack = await GameServerService.getModPack();

      if (modPack) {
        res.setHeader('Content-Type', modPack.meta);
        res.setHeader('Content-Disposition', `attachment; filename="${modPack.name}"`);
        res.status(200).send(modPack.zip);
        logger.log('Modpack loaded', 'API', 200, req.ip)
      } else {
        const error = new ServerError('No found requeued mods', 404, 'Game Server:mods');
        res.status(404).send(error.message);
      }

    } catch {
      const error = new ServerError('Mod pack unavailable', 500, 'Game Server:mods');
      res.status(500).send(error.message);
    }
  },

  getList: async (req: Request, res: Response) => {
    try {
      const list = await GameServerService.getModsList();
      res.status(200).json(list);
      logger.log('Modlist loaded', 'API', 200, req.ip)

    } catch {
      const error = new ServerError('Mod list unavailable', 500, 'Game Server:mods');
      res.status(500).send(error.message);
    }
  }
}