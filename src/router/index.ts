import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DettaglioView from '@/views/DettaglioView.vue'
import CreaArticoloView from '@/views/CreaArticoloView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dettaglio/:id',
      name: 'dettaglio',
      component: DettaglioView,
      props: true
    },
    {
      path: '/creaArticolo',
      name: 'creaArticolo',
      component: CreaArticoloView
    },
  ]
})

export default router
