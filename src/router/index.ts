import { createRouter, createWebHashHistory } from 'vue-router'
import BookmarkView from '@/views/BookmarkView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'bookmark',
      component: BookmarkView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
