import { Router } from 'express'
import StatusHandlers from '../../handles/mods';
const router = Router()

router.get('/', StatusHandlers.getList)
router.get('/plugins.zip', StatusHandlers.getPack)

export default router;