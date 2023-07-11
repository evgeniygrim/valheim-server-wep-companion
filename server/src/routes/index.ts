// import router, {default as users} from './users';
import { Router } from 'express'

const router = Router()
// router.use('/api/users', users);

// router.get('/api', (req, res) => {
//   res.status(404).json({ message: 'no found' });
// });

router.get('/', (reg, res) => {
  res.status(200).json({message: 'api request'})
})

export default router;