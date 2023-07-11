import Static from './static';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...Static,
  ],
})

export default router;