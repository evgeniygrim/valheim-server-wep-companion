import { Router } from 'express'
import status from './status'
import mods from './mods'

const router = Router()
router.use('/api/status', status);
router.use('/api/mods', mods);

router.get('/api', (reg, res) => {
  res.status(404).json('Api undefined')
})

export default router;
