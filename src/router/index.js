import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
