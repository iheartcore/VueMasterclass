import { defineStore } from 'pinia'
import { addIfNotExists, findById, upsert, docToResource } from '@/helpers'
import firebase from 'firebase'
import { allStore } from '@/stores/index'

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
      threadId: string
      forumId: string
    }) {
      const forum = findById({ resources: this.forums, id: forumId })
      forum.threads = forum?.threads || []
      addIfNotExists(forum.threads, threadId)
    },
    setForum({ forum }: { forum: object }) {
      upsert({ resources: this.forums, newResource: docToResource(forum) })
    },
    fetchForum({ id }: { id: string }) {
      return new Promise((resolve) => {
        const unsubscribe = firebase
          .firestore()
          .collection('forums')
          .doc(id)
          .onSnapshot((doc) => {
            const forum = {
              ...doc.data(),
              id: doc.id,
            }
            this.setForum({ forum })
            allStore.addUnsubscribe(unsubscribe)
            resolve(forum)
          })
      })
    },
    fetchForums({ ids }: { ids: Array<string> }) {
      return Promise.all(ids.map((id) => this.fetchForum({ id })))
    },
  },
})
