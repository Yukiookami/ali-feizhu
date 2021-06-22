/*
 * @Author: zxy
 * @Date: 2021-05-26 14:03:33
 * @LastEditTime: 2021-06-22 20:45:19
 * @FilePath: /feizhu/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
// axios
import axios from 'axios'
// cookies
import { VueCookieNext } from 'vue-cookie-next'
// css resets
import 'normalize.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 导入mock
require('./mock/basis/index')
const app = createApp(App)

app.use(store).use(router).mount('#app')

app.config.globalProperties.$http = axios
app.config.globalProperties.$cookie = VueCookieNext

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 判断是否需要登录
  if(to.meta.requiresAuth) {
    // 判断是否有cookie
    if(VueCookieNext.getCookie("login_cookies")) {
      if (store.state.tickMode || store.state.tickMode === 0)  {
        next()
      } else {
        next({
          path: '/'
        })
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})