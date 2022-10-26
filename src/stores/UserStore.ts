import { defineStore } from 'pinia'
import { findById, addIfNotExists, upsert, docToResource } from '@/helpers'
import firebase from 'firebase'
import { allStore } from '@/stores'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: [],
    }
  },
  actions: {
    async createUser({
      email,
      name,
      username,
      avatar = null,
      id,
    }: {
      email: string
      name: string
      username: string
      avatar: string
      id: string
    }) {
      const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()

      const user = {
        email,
        name,
        username,
        avatar,
        registeredAt,
        usernameLower,
      }

      const userRef = await firebase.firestore().collection('users').doc(id)
      userRef.set(user)
      const newUser = await userRef.get()
      upsert({ resources: this.users, newResource: docToResource(newUser) })

      return docToResource(newUser)
    },
    async updateUser({ user }: { user: object }) {
      const updates = {
        avatar: user.avatar || null,
        username: user.username || null,
        name: user.name || null,
        bio: user.bio || null,
        website: user.website || null,
        email: user.email || null,
        location: user.location || null,
      }

      const userRef = firebase.firestore().collection('users').doc(user.id)
      await userRef.update(updates)

      setUser(user)
    },
    saveUser({ activeUser }: { activeUser: object }) {
      upsert({ resources: this.users, newResource: docToResource(activeUser) })
    },
    setUser({ user }: { user: object }) {
      upsert({ resources: this.users, newResource: docToResource(user) })
    },
    appendThreadToUser({
      threadId,
      userId,
    }: {
      threadId: string
      userId: string
    }) {
      const user = findById({ resources: this.users, id: userId })
      if (user) {
        user.threads = user?.threads || []
        addIfNotExists(user.threads, threadId)
      }
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
