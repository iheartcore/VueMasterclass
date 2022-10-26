import { defineStore } from 'pinia'
import { findById, addIfNotExists, upsert, docToResource } from '@/helpers'
import firebase from 'firebase'
import { allStore } from '@/stores'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: [],
      authId: null,
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
          return user.threads?.length || 0
        },
      }
    },
    getUserById: (state) => {
      return (userId: { userId: string }) =>
        findById({ resources: state.users, id: userId })
    },
  },
  actions: {
    initAuthentication() {
      if (allStore.authObserverUnsubscribe) {
        return
      }
      return new Promise((resolve) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          allStore.unsubscribeAuthUserSnapshot()
          if (user) {
            await this.fetchAuthUser()
          }
          resolve(user)
        })
        allStore.setAuthObserverUnsubscribe(unsubscribe)
      })
    },
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const response = await firebase.auth().signInWithPopup(provider)
      const user = response.user
      const userRef = firebase.firestore().collection('users').doc(user.uid)
      const userDoc = await userRef.get()

      if (!userDoc.exists) {
        return this.createUser({
          email: user.email,
          id: user.uid,
          name: user.displayName,
          username: user.email,
          avatar: user.photoURL,
        })
      }
    },
    async registerUserWithEmailAndPassword({
      email,
      password,
      name,
      username,
      avatar = null,
    }: {
      email: string
      password: string
      name: string
      username: string
      avatar: string
    }) {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      await allStore.userStore().createUser({
        email: email,
        name: name,
        username: username,
        avatar: avatar,
        id: result.user.uid,
      })
      await allStore.userStore().fetchAuthUser()
    },
    async signInWithEmailAndPassword({ data }: { data: object }) {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)

      this.fetchAuthUser(result.uid)
    },
    async signOut() {
      await firebase.auth().signOut()
      this.authId = null
    },
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
    fetchAuthUser() {
      const userId = firebase.auth().currentUser?.uid
      if (!userId) return
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .onSnapshot((doc) => {
            const user = {
              ...doc.data(),
              id: doc.id,
            }
            this.authId = userId
            this.setUser({ user })
            allStore.unsubscribeAuthUserSnapshot(unsubscribe)
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
