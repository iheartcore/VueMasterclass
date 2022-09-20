import Home from '@/pages/TheHome.vue'
import Profile from '@/pages/TheProfile.vue'
import Category from '@/pages/TheCategory.vue'
import Forum from '@/pages/TheForum.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import { useStore } from '@/stores'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
  },
  // {
  //   path: '/profile/:id',
  //   name: 'Profile',
  //   component: Profile,
  //   props: true
  // },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists
      const threadExists = useStore().$state.threads.find(
        (thread) => thread.id === to.params.id
      )
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash,
        })
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default routes
