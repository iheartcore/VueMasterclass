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
  await allStore.userStore().initAuthentication()
  allStore.unsubscribeAllSnapshots()
  if (to.meta.requiresAuth && !allStore.userStore().authId) {
    return { name: 'Home' }
  }
})

export default router
