import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/app/style.scss'

const app = createApp(App)

// TODO: Remove when vuejs is upgraded to >=3.3
app.config.unwrapInjectedRef = true

app
    .use(router)
    .mount('#app')
