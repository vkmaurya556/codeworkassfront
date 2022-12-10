import { createRouter, createWebHistory } from 'vue-router'
import TodoShow from '../views/TodoShow.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoShow
    },
  ]
})

export default router
