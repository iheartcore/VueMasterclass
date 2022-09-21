import { defineStore } from 'pinia'
import sourceData from '../data.json'

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
      const forum = this.forums.find((forum) => forum.id === forumId)
      forum.threads = forum?.threads || []
      forum?.threads.push(threadId)
    },
  },
})
