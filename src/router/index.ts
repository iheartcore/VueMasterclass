import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { allStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) {
      scroll.top = 0
    }
    if (to.meta.smoothScroll) {
      scroll.behavior = 'smooth'
    }
    return scroll
  },
})

router.beforeEach(async (to) => {
  await allStore.authStore().initAuthentication()
  allStore.unsubscribeAllSnapshots()
  if (to.meta.requiresAuth && !allStore.authStore().authId) {
    return { name: 'SignIn', query: { redirectTo: to.path } }
  }
  if (to.meta.requiresGuest && allStore.authStore().authId) {
    return { name: 'Home' }
  }
})

export default router
