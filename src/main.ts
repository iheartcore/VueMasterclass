import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import utils from './plugins/utils'

import './styles/app/style.scss'

const pinia = createPinia()
const app = createApp(App)

// TODO: Remove when vuejs is upgraded to >=3.3
app.config.unwrapInjectedRef = true

app
    .use(pinia)
    .use(utils)
    .use(router)
    .mount('#app')
