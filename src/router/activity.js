/*
 * @Author: zxy
 * @Date: 2021-06-22 20:23:11
 * @LastEditTime: 2021-06-23 18:08:34
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
