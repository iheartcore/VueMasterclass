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
    }
})
