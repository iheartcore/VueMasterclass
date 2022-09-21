import { defineStore } from 'pinia'
import sourceData from '../data.json'

export const useThreadStore = defineStore('ThreadStore', {
  state: () => {
    return {
      threads: sourceData.threads,
    }
  },
  actions: {
    appendPostToThread({ postId, threadId }: { postId: any; threadId: any }) {
      const thread = this.threads.find((thread) => thread.id === threadId)
      thread?.posts.push(postId)
    },
    createThread({ thread }: { thread: any }) {
      this.threads.push(thread)
    },
  },
})
