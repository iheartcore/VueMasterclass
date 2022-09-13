import { createApp } from 'vue'
import App from './App.vue'

import './styles/app/style.scss'

const app = createApp(App)

// TODO: Remove when vuejs is upgraded to >=3.3
app.config.unwrapInjectedRef = true

app.mount('#app')
