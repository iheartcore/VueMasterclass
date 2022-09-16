import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '../components/PageHome.vue'
import PageThreadShow from '../components/PageThreadShow.vue'
import NotFound from '../components/PageNotFound.vue'

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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
