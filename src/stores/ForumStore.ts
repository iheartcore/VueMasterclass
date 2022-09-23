import { defineStore } from 'pinia'
import { addIfNotExists, findById } from '@/helpers'

export const useForumStore = defineStore('forumStore', {
  state: () => {
    return {
      forums: [],
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
      const forum = findById({ resources: this.forums, id: forumId })
      forum.threads = forum?.threads || []
      addIfNotExists(forum.threads, threadId)
    },
  },
})
