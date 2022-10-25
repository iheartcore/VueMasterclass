import Home from '@/pages/TheHome.vue'
import Profile from '@/pages/TheProfile.vue'
import Category from '@/pages/TheCategory.vue'
import Forum from '@/pages/TheForum.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import ThreadCreate from '@/pages/ThreadCreate.vue'
import ThreadEdit from '@/pages/ThreadEdit.vue'
import NotFound from '@/pages/NotFound.vue'
import Register from '@/pages/RegisterPage.vue'
import SignIn from '@/pages/SignIn.vue'
import { allStore } from '@/stores'
import { findById } from '@/helpers'

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
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: {
      edit: true,
    },
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
    async beforeEnter(to, from, next) {
      await allStore.threadStore().fetchThread({ id: to.params.id })
      const threadExists = findById({
        resources: allStore.threadStore().threads,
        id: to.params.id,
      })

      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        })
      }
    },
  },
  {
    path: '/forum/:forumId/thread/create/',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
  },
  {
    path: '/thread/:id/edit/',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter(to, from) {
      await allStore.userStore().signOut()
      return { name: 'Home' }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default routes
