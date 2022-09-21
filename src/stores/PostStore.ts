import { defineStore } from 'pinia'
import sourceData from '../data.json'
import { useThreadStore } from '@/stores/ThreadStore'
import { useUserStore } from '@/stores/UserStore'

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      posts: sourceData.posts,
    }
  },
  actions: {
    createPost({ post }: { post: any }) {
      post.id = 'sdfsa' + Math.random()
      post.userId = useUserStore().authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      this.posts.push(post)
      useThreadStore().appendPostToThread({
        postId: post.id,
        threadId: post.threadId,
      })
    },
  },
})
