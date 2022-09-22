import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { usePostStore } from '@/stores/PostStore'
import { useThreadStore } from '@/stores/ThreadStore'
import { findById, addIfNotExists } from '@/helpers'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: sourceData.users,
      authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
    }
  },
  getters: {
    authUser(state) {
      const user = findById(state.users, state.authId)

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
      return (userId: { userId: string }) => findById(state.users, userId)
    },
  },
  actions: {
    saveUser({ activeUser }: { activeUser: any }) {
      const userIndex = this.users.findIndex(
        (user) => user.id === activeUser.id
      )
      this.users[userIndex] = activeUser
    },
    appendThreadToUser({ threadId, userId }: { threadId: any; userId: any }) {
      const user = findById(this.users, userId)
      user.threads = user?.threads || []
      addIfNotExists(user.threads, threadId)
    },
  },
})
