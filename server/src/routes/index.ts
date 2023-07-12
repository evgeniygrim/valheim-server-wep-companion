import { Router, Response } from 'express'
import {default as status} from './status/index'
import {default as mods} from './mods/index'

const send404 = (res: Response) => res.status(404).json('Api undefined')
const router = Router()

router.get('/', (reg, res) => {
  send404(res);
})

router.use('/status', status);
router.use('/mods', mods);

export default router;
