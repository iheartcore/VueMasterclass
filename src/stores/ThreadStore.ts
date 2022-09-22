import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { useUserStore } from '@/stores/UserStore'
import { usePostStore } from '@/stores/PostStore'
import { useForumStore } from '@/stores/ForumStore'
import { addIfNotExists, findById, upsert } from '@/helpers'

export const useThreadStore = defineStore('ThreadStore', {
  state: () => {
    return {
      threads: sourceData.threads,
    }
  },
  actions: {
    appendPostToThread({
      postId,
      threadId,
    }: {
      postId: string
      threadId: string
    }) {
      const thread = findById(this.threads, threadId)
      thread.posts = thread?.posts || []
      addIfNotExists(thread.posts, postId)
    },
    appendContributorToThread({
      userId,
      threadId,
    }: {
      userId: string
      threadId: string
    }) {
      const thread = findById(this.threads, threadId)
      thread.contributors = thread?.contributors || []
      addIfNotExists(thread.contributors, userId)
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

      this.setThread({ thread })
      useUserStore().appendThreadToUser({
        threadId: thread.id,
        userId: thread.userId,
      })
      useForumStore().appendThreadToForum({
        threadId: thread.id,
        forumId: forumId,
      })
      usePostStore().createPost({ post: post })

      return findById(this.threads, thread.id)
    },
    setThread({ thread }: { thread: any }) {
      upsert(this.threads, thread)
    },
    async updateThread({ thread }: { thread: any }) {
      const threadObj = findById(this.threads, thread.id)
      const post = findById(usePostStore().posts, threadObj?.posts[0])
      const newThread = { ...threadObj, title: thread.title }
      const newPost = { ...post, text: thread.text }
      delete thread.text

      this.setThread({ thread: newThread })
      usePostStore().setPost({ post: newPost })

      return thread
    },
  },
})
