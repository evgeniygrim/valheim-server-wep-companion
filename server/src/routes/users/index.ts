import { Router } from 'express'
import UserHandlers from '../../handles/users';
const router = Router()

router.get('/', UserHandlers.getAll)
router.post('/', UserHandlers.create)

router.get('/:id', UserHandlers.get)
router.patch('/:id', UserHandlers.update)
router.post('/:id', UserHandlers.update)
router.delete('/id', UserHandlers.remove)

export default router;