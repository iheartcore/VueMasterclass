import { defineStore } from 'pinia'
import sourceData from '../data.json'

export const useForumStore = defineStore('forumStore', {
  state: () => {
    return {
      forums: sourceData.forums,
    }
  },
})
