import { defineStore } from 'pinia'
import { findById, addIfNotExists, upsert, docToResource } from '@/helpers'
import firebase from 'firebase'
import { allStore } from '@/stores/index'

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
        get postsCount() {
          return user.postsCount || 0
        },
        get threadsCount() {
          return user.threads.length || 0
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
      upsert({ resources: this.users, newResource: docToResource(activeUser) })
    },
    setUser({ user }: { user: any }) {
      upsert({ resources: this.users, newResource: docToResource(user) })
    },
    appendThreadToUser({ threadId, userId }: { threadId: any; userId: any }) {
      const user = findById({ resources: this.users, id: userId })
      if (user) {
        user.threads = user?.threads || []
        addIfNotExists(user.threads, threadId)
      }
    },
    fetchAuthUser() {
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('users')
          .doc(this.authId)
          .onSnapshot((doc) => {
            const user = {
              ...doc.data(),
              id: doc.id,
            }
            this.setUser({ user })
            allStore.addUnsubscribe(unsubscribe)
            resolve(user)
          })
      })
    },
    fetchUser({ id }: { id: string }) {
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('users')
          .doc(id)
          .onSnapshot((doc) => {
            const user = {
              ...doc.data(),
              id: doc.id,
            }
            this.setUser({ user })
            allStore.addUnsubscribe(unsubscribe)
            resolve(user)
          })
      })
    },
    fetchUsers({ ids }: { ids: Array<string> }) {
      return Promise.all(ids.map((id) => this.fetchUser({ id })))
    },
  },
})
