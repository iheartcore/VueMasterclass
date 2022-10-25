import { useThreadStore } from '@/stores/ThreadStore'
import { usePostStore } from '@/stores/PostStore'
import { useForumStore } from '@/stores/ForumStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useUserStore } from '@/stores/UserStore'

export const allStore = {
  threadStore: useThreadStore,
  postStore: usePostStore,
  forumStore: useForumStore,
  categoryStore: useCategoryStore,
  userStore: useUserStore,
  unsubscribes: [],
  authUserUnsubscribe: null,
  addUnsubscribe(unsubscribe) {
    this.unsubscribes.push(unsubscribe)
  },
  unsubscribeAllSnapshots() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe())
    this.clearAllUnsubscribes()
  },
  clearAllUnsubscribes() {
    this.unsubscribes = []
  },
  unsubscribeAuthUserSnapshot() {
    if (this.authUserUnsubscribe) {
      this.authUserUnsubscribe()
      this.setAuthUserUnsubscribe(null)
    }
  },
  setAuthUserUnsubscribe(unsubscribe) {
    this.authUserUnsubscribe = unsubscribe
  },
}

export default allStore
