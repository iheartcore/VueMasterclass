import { defineStore } from 'pinia'
import sourceData from '../data.json'

export const useStore = defineStore('main', {
    state: () => {
        return {
            forums: sourceData.forums,
            categories: sourceData.categories,
            posts: sourceData.posts,
            threads: sourceData.threads,
            users: sourceData.users
        }
    },
    actions: {
        createPost (post) {
            post.id = 'sdfsa' + Math.random()
            this.posts.push(post)
            this.appendPostToThread(post.id, post.threadId)
        },
        appendPostToThread (postId, threadId) {
            const thread = this.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        }
    }
})
