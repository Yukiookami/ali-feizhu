import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/trainTicket',
    mate: {
      title: '火车票汽车票'
    },
    children: [
      {
        path: '/trainTicket',
        name: 'trainTicket',
        component: () => import('../views/getTrainTicket.vue')
      },
      {
        path: '/busTicket',
        name: 'busTicket',
        component: () => import('../views/getBusTicket.vue')
      }
    ]
  },
  {
    path: '/tickPage',
    name: 'tickPage',
    component: () => import('../views/chooseTickPage.vue')
  },
  {
    path: '/buyTick',
    name: 'buyTick',
    component: () => import('../views/buyTickPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
