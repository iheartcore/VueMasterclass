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
      this.setPost(post)
      useThreadStore().appendPostToThread({
        postId: post.id,
        threadId: post.threadId,
      })
    },
    setPost({ post }: { post: any }) {
      const postIndex = this.posts.findIndex((p) => p.id === post.id)
      if (post.id && postIndex !== -1) {
        this.posts[postIndex] = post
      } else {
        this.posts.push(post)
      }
    },
  },
})
