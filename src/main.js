import 'v-calendar/style.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from './plugins/axios'

const app = createApp(App)
app.use(router)
app.use(axios)
app.mount('#app')

