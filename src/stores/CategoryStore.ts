import { defineStore } from 'pinia'
import firebase from 'firebase'
import { upsert, docToResource } from '@/helpers'
import { allStore } from '@/stores/index'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: [],
    }
  },
  actions: {
    setCategory({ category }: { category: any }) {
      upsert({
        resources: this.categories,
        newResource: docToResource(category),
      })
    },
    fetchCategory({ id }: { id: string }) {
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('categories')
          .doc(id)
          .onSnapshot((doc) => {
            const category = {
              ...doc.data(),
              id: doc.id,
            }
            this.setCategory({ category })
            allStore.addUnsubscribe(unsubscribe)
            resolve(category)
          })
      })
    },
    fetchAllCategories() {
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('categories')
          .onSnapshot((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => {
              const item = { id: doc.id, ...doc.data() }
              this.setCategory({ category: item })
              return item
            })
            allStore.addUnsubscribe(unsubscribe)
            resolve(categories)
          })
      })
    },
  },
})
