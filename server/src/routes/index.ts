import {default as users} from './users';
import { Router } from 'express'

const router = Router()
router.use('/api/users', users);

router.get('/api', (req, res) => {
  res.status(404).json({ message: 'no found' });
});

export default router;