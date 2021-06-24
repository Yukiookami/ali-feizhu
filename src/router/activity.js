/*
 * @Author: zxy
 * @Date: 2021-06-22 20:23:11
 * @LastEditTime: 2021-06-24 18:51:48
 * @FilePath: /feizhu/src/router/activity.js
 */
export default [
  {
    path: '/ariport',
    name: 'ariport',
    component: () => import('../views/activityPage/activityPage.vue')
  },
  {
    path: '/airportPay',
    name: 'airportPay',
    component: () => import('../components/activity/AirportPickUp/ariportPay.vue'),
    meta: {
      requiresAuth: true
    }
  }
]
