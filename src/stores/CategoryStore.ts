import { defineStore } from 'pinia'
import firebase from 'firebase'
import { upsert } from '@/helpers'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: [],
    }
  },
  actions: {
    setCategory({ category }: { category: any }) {
      upsert({ resources: this.categories, newResource: category })
    },
    fetchAllCategories() {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('categories')
          .onSnapshot((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => {
              const item = { id: doc.id, ...doc.data() }
              this.setCategory({ category: item })
              return item
            })
            resolve(categories)
          })
      })
    },
  },
})
