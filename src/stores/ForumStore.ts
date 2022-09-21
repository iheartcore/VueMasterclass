import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { findById } from '@/helpers'

export const useForumStore = defineStore('forumStore', {
  state: () => {
    return {
      forums: sourceData.forums,
    }
  },
  actions: {
    appendThreadToForum({
      threadId,
      forumId,
    }: {
      threadId: any
      forumId: any
    }) {
      const forum = findById(this.forums, forumId)
      forum.threads = forum?.threads || []
      forum?.threads.push(threadId)
    },
  },
})
