import { defineStore } from 'pinia'
import sourceData from '../data.json'

export const useStore = defineStore('main', {
    state: () => {
        return {
            forums: sourceData.forums,
            categories: sourceData.categories,
            posts: sourceData.posts,
            threads: sourceData.threads,
            users: sourceData.users,
            authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
        }
    },
    getters : {
        authUser(state) {
            const user = state.users.find(user => user.id === state.authId)

            if(!user) return null

            return {
                ...user,
                get posts () {
                    return state.posts.filter(posts => posts.userId === user.id)
                },
                get threads () {
                    return state.threads.filter(posts => posts.userId === user.id)
                },
                get postsCount () {
                    return this.posts.length
                },
                get threadsCount () {
                    return this.threads.length
                },
            }
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
