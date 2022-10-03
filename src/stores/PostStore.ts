import { defineStore } from 'pinia'
import { useThreadStore } from '@/stores/ThreadStore'
import { useUserStore } from '@/stores/UserStore'
import { upsert, docToResource } from '@/helpers'
import firebase from 'firebase'

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      posts: [],
    }
  },
  actions: {
    async createPost({ post }: { post: any }) {
      post.userId = useUserStore().authId
      post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()

      const batch = firebase.firestore().batch()
      const postRef = firebase.firestore().collection('posts').doc()
      const threadRef = firebase
        .firestore()
        .collection('threads')
        .doc(post.threadId)
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(useUserStore().authId)

      batch.set(postRef, post)
      batch.update(threadRef, {
        posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
        contributors: firebase.firestore.FieldValue.arrayUnion(
          useUserStore().authId
        ),
      })
      batch.update(userRef, {
        postsCount: firebase.firestore.FieldValue.increment(1),
      })
      await batch.commit()

      const newPost = await postRef.get()
      post = newPost.data()
      post.id = postRef.id
      this.setPost({ post })
      useThreadStore().appendPostToThread({
        postId: postRef.id,
        threadId: post.threadId,
      })
      useThreadStore().appendContributorToThread({
        userId: post.userId,
        threadId: post.threadId,
      })
    },
    setPost({ post }: { post: any }) {
      upsert({ resources: this.posts, newResource: docToResource(post) })
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
    fetchPosts({ ids }: { ids: Array<string> }) {
      return Promise.all(ids.map((id) => this.fetchPost({ id })))
    },
  },
})
