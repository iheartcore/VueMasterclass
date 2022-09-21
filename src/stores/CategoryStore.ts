import { defineStore } from 'pinia'
import sourceData from '@/data.json'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: sourceData.categories,
    }
  },
})
