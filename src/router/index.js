/*
 * @Author: zxy
 * @Date: 2021-05-26 14:03:33
 * @LastEditTime: 2021-06-18 17:55:30
 * @FilePath: /feizhu/src/router/index.js
 */
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
        component: () => import('../views/getTrainTicket.vue'),
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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/payTickPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/aliPayPage',
    name: 'aliPay',
    component: () => import('../views/aliPay.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/aliPaySuccess',
    name: 'aliPaySuccess',
    component: () => import('../views/aliPaySuccess.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
