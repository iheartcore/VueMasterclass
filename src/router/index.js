import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '../components/PageHome.vue'
import PageThreadShow from '../components/PageThreadShow.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
