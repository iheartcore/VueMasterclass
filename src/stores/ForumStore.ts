import { defineStore } from 'pinia'
import { addIfNotExists, findById, upsert, docToResource } from '@/helpers'
import firebase from 'firebase'

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
    setForum({ forum }: { forum: any }) {
      upsert({ resources: this.forums, newResource: docToResource(forum) })
    },
    fetchForum({ id }: { id: string }) {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('forums')
          .doc(id)
          .onSnapshot((doc) => {
            const forum = {
              ...doc.data(),
              id: doc.id,
            }
            this.setForum({ forum })
            resolve(forum)
          })
      })
    },
    fetchForums({ ids }: { ids: Array<string> }) {
      return Promise.all(ids.map((id) => this.fetchForum({ id })))
    },
  },
})
