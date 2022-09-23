import { defineStore } from 'pinia'
import { useThreadStore } from '@/stores/ThreadStore'
import { useUserStore } from '@/stores/UserStore'
import { upsert } from '@/helpers'
import firebase from 'firebase'

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      posts: [],
    }
  },
  actions: {
    createPost({ post }: { post: any }) {
      post.id = 'sdfsa' + Math.random()
      post.userId = useUserStore().authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      this.setPost({ post })
      useThreadStore().appendPostToThread({
        postId: post.id,
        threadId: post.threadId,
      })
      useThreadStore().appendContributorToThread({
        userId: post.userId,
        threadId: post.threadId,
      })
    },
    setPost({ post }: { post: any }) {
      upsert({ resources: this.posts, newResource: post })
    },
    fetchPost({ id }: { id: string }) {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('posts')
          .doc(id)
          .onSnapshot((doc) => {
            const post = {
              ...doc.data(),
              id: doc.id,
            }
            this.setPost({ post })
            resolve(post)
          })
      })
    },
  },
})
