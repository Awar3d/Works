import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GenreView from '@/views/GenreView.vue'
import GenreDetailsView from '@/views/GenreDetailsView.vue'
import Film from '@/views/Film.vue'
import AccountView from '@/views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/genre',
      name: 'genre',
      component: GenreView
    },
    {
      path: '/genre/:genre',
      name: 'genre-detail',
      component: GenreDetailsView,
      props: true,
    },
    {
      path: '/genre/:genre/:film',
      name: 'filmFromGenre',
      component: Film,
      props: true,
    },
    {
      path: '/:film',
      name: 'film',
      component: Film,
      props: true,
    },
  ],
})

export default router
