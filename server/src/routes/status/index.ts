import { Router } from 'express'
import StatusHandlers from '../../handles/status';
const router = Router()

router.get('/', StatusHandlers.get)

export default router;