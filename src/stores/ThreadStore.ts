import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { useUserStore } from '@/stores/UserStore'
import { usePostStore } from '@/stores/PostStore'
import { useForumStore } from '@/stores/ForumStore'

export const useThreadStore = defineStore('ThreadStore', {
  state: () => {
    return {
      threads: sourceData.threads,
    }
  },
  actions: {
    appendPostToThread({ postId, threadId }: { postId: any; threadId: any }) {
      const thread = this.threads.find((thread) => thread.id === threadId)
      thread.posts = thread?.posts || []
      thread?.posts.push(postId)
    },
    async createThread({ thread, forumId }: { thread: any; forumId: any }) {
      const postText = thread.text
      thread.id = 'safsadfa' + Math.random()
      thread.forumId = forumId
      thread.userId = useUserStore().authId
      thread.publishedAt = Math.floor(Date.now() / 1000)
      delete thread.text

      const post = {
        text: postText,
        threadId: thread.id,
      }

      this.setThread(thread)
      useUserStore().appendThreadToUser({
        threadId: thread.id,
        userId: thread.userId,
      })
      useForumStore().appendThreadToForum({
        threadId: thread.id,
        forumId: forumId,
      })
      usePostStore().createPost({ post: post })

      return this.threads.find((t) => t.id === thread.id)
    },
    setThread({ thread }: { thread: any }) {
      const threadIndex = this.threads.findIndex((t) => t.id === thread.id)
      if (thread.id && threadIndex !== -1) {
        this.threads[threadIndex] = thread
      } else {
        this.threads.push(thread)
      }
    },
    async updateThread({ thread }: { thread: any }) {
      const threadObj = this.threads.find((t) => t.id === thread.id)
      const post = usePostStore().posts.find(
        (post) => post.id === threadObj?.posts[0]
      )
      const newThread = { ...threadObj, title: thread.title }
      const newPost = { ...post, text: thread.text }
      delete thread.text

      this.setThread({ thread: newThread })
      usePostStore().setPost({ post: newPost })

      return thread
    },
  },
})
