import { createApp } from 'vue'
import App from './App.vue'
// axios
import axios from './static/js/axios'
// css resets
import 'normalize.css'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store).use(router).mount('#app')

app.config.globalProperties.$http = axios