import { defineStore } from 'pinia'
import { usePostStore } from '@/stores/PostStore'
import { useThreadStore } from '@/stores/ThreadStore'
import { findById, addIfNotExists, upsert } from '@/helpers'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: [],
      authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
    }
  },
  getters: {
    authUser(state) {
      const user = findById({ resources: state.users, id: state.authId })

      if (!user) return null

      return {
        ...user,
        get posts() {
          return usePostStore().posts.filter(
            (posts) => posts.userId === user.id
          )
        },
        get threads() {
          return useThreadStore().threads.filter(
            (posts) => posts.userId === user.id
          )
        },
        get postsCount() {
          return this.posts.length
        },
        get threadsCount() {
          return this.threads.length
        },
      }
    },
    getUserById: (state) => {
      return (userId: { userId: string }) =>
        findById({ resources: state.users, id: userId })
    },
  },
  actions: {
    saveUser({ activeUser }: { activeUser: any }) {
      upsert({ resources: this.users, newResource: activeUser })
    },
    setUser({ user }: { user: any }) {
      upsert({ resources: this.users, newResource: user })
    },
    appendThreadToUser({ threadId, userId }: { threadId: any; userId: any }) {
      const user = findById({ resources: this.users, id: userId })
      user.threads = user?.threads || []
      addIfNotExists(user.threads, threadId)
    },
  },
})
