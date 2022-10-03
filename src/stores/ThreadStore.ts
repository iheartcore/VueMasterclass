import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { usePostStore } from '@/stores/PostStore'
import { useForumStore } from '@/stores/ForumStore'
import { addIfNotExists, findById, upsert } from '@/helpers'
import firebase from 'firebase'

export const useThreadStore = defineStore('ThreadStore', {
  state: () => {
    return {
      threads: [],
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
      const thread = findById({ resources: this.threads, id: threadId })
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
      const thread = findById({ resources: this.threads, id: threadId })
      thread.contributors = thread?.contributors || []
      addIfNotExists(thread.contributors, userId)
    },
    async createThread({ thread, forumId }: { thread: any; forumId: any }) {
      const postText = thread.text
      thread.forumId = forumId
      thread.userId = useUserStore().authId
      thread.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
      delete thread.text

      const threadRef = firebase.firestore().collection('threads').doc()
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(useUserStore().authId)
      const forumRef = firebase.firestore().collection('forums').doc(forumId)
      const batch = firebase.firestore().batch()

      batch.set(threadRef, thread)
      batch.update(userRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      })
      batch.update(forumRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      })

      await batch.commit()
      const newThread = await threadRef.get()

      this.setThread({ thread: newThread })
      useUserStore().appendThreadToUser({
        threadId: threadRef.id,
        userId: userRef.id,
      })
      useForumStore().appendThreadToForum({
        threadId: threadRef.id,
        forumId: forumRef.id,
      })

      const post = {
        text: postText,
        threadId: threadRef.id,
      }

      await usePostStore().createPost({ post: post })

      return findById({ resources: this.threads, id: threadRef.id })
    },
    setThread({ thread }: { thread: any }) {
      upsert({ resources: this.threads, newResource: thread })
    },
    fetchThread({ id }: { id: string }) {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('threads')
          .doc(id)
          .onSnapshot((doc) => {
            const thread = {
              ...doc.data(),
              id: doc.id,
            }
            this.setThread({ thread })
            resolve(thread)
          })
      })
    },
    fetchThreads({ ids }: { ids: Array<string> }) {
      return Promise.all(ids.map((id) => this.fetchThread({ id })))
    },
    async updateThread({ thread }: { thread: any }) {
      const threadObj = findById({ resources: this.threads, id: thread.id })
      const post = findById({
        resources: usePostStore().posts,
        id: threadObj?.posts[0],
      })
      const newThread = { ...threadObj, title: thread.title }
      const newPost = { ...post, text: thread.text }
      delete thread.text

      this.setThread({ thread: newThread })
      usePostStore().setPost({ post: newPost })

      return thread
    },
  },
})
