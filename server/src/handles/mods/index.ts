import GameServerService from '../../services/game-server';
import {Request, Response} from 'express';
import {ServerError} from '../../utils/error';


export default {
  getPack: async (reg: Request, res: Response) => {
    try {
      const modPack = await GameServerService.getModPack();

      if (modPack) {
        res.setHeader('Content-Type', modPack.meta);
        res.setHeader('Content-Disposition', `attachment; filename="${modPack.name}"`);
        res.sendStatus(200).send(modPack.zip);
      } else {
        const error = new ServerError('No found requeued mods', 404, 'Game Server:mods');
        res.sendStatus(404).send(error.message);
      }

    } catch {
      const error = new ServerError('Mod pack unavailable', 500, 'Game Server:mods');
      res.sendStatus(500).send(error.message);
    }
  },

  getList: async (reg: Request, res: Response) => {
    try {
      const list = await GameServerService.getModsList();
      res.sendStatus(200).json(list);

    } catch {
      const error = new ServerError('Mod list unavailable', 500, 'Game Server:mods');
      res.sendStatus(500).send(error.message);
    }
  }
}