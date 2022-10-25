import { createApp } from 'vue'
import { createPinia } from 'pinia'
import firebase from 'firebase/app'
import App from '@/App.vue'
import router from '@/router'
import utils from '@/plugins/utils'
import FontAwesome from '@/plugins/FontAwesome'
import { allStore } from '@/stores/index'

import './styles/app/style.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const firebaseConfig = {
  apiKey: 'AIzaSyDGi0p_kpbhOQ4Vc-9a2_rqIpihBEmSPlA',
  authDomain: 'vueschoolmasterclass-461e7.firebaseapp.com',
  projectId: 'vueschoolmasterclass-461e7',
  storageBucket: 'vueschoolmasterclass-461e7.appspot.com',
  messagingSenderId: '826537274892',
  appId: '1:826537274892:web:febdec7be608e9edad4829',
}

firebase.initializeApp(firebaseConfig)

// TODO: Remove when vuejs is upgraded to >=3.3
app.config.unwrapInjectedRef = true

app.use(utils).use(FontAwesome).use(router).mount('#app')
