import { createApp } from 'vue'
import App from './App.vue'
// axios
import axios from 'axios'
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