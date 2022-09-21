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
    createThread({ thread, forumId }: { thread: any; forumId: any }) {
      const postText = thread.text
      delete thread.text
      thread.id = 'safsadfa' + Math.random()
      thread.forumId = forumId
      thread.userId = useUserStore().authId
      thread.publishedAt = Math.floor(Date.now() / 1000)

      const post = {
        text: postText,
        threadId: thread.id,
      }

      this.threads.push(thread)
      useUserStore().appendThreadToUser({
        threadId: thread.id,
        userId: thread.userId,
      })
      useForumStore().appendThreadToForum({
        threadId: thread.id,
        forumId: forumId,
      })
      usePostStore().createPost({ post: post })
    },
  },
})
