import { defineStore } from 'pinia'
import { findById } from '@/helpers'
import firebase from 'firebase'
import { allStore } from '@/stores'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      users: [],
    }
  },
  getters: {
    authUser(state) {
      const user = findById({
        resources: allStore.userStore().users,
        id: state.authId,
      })

      if (!user) return null

      return {
        ...user,
        get posts() {
          const result = allStore
            .postStore()
            .posts.filter((post) => post.userId === state.authId)

          if (Array.isArray(result)) {
            return result
          } else {
            return [result]
          }
        },
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
      await allStore.authStore().fetchAuthUser()
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
            allStore.userStore().setUser({ user })
            allStore.unsubscribeAuthUserSnapshot(unsubscribe)
            resolve(user)
          })
      })
    },
    async fetchAuthUsersPosts(startAfter) {
      let query = await firebase
        .firestore()
        .collection('posts')
        .where('userId', '==', allStore.authStore().authId)
        .orderBy('publishedAt', 'desc')
        .limit(10)

      if (startAfter) {
        const doc = await firebase
          .firestore()
          .collection('posts')
          .doc(startAfter.id)

        query = query.startAfter(doc)
      }

      const posts = await query.get()

      posts.forEach((element) => {
        allStore.postStore().setPost({ post: element })
      })
    },
  },
})
