import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios) // 順序不能顛倒
app.mount('#app')
