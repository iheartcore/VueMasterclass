<script>

import { mapState } from 'pinia'
import { useStore } from '../stores'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useStore, {
      threads: store => store.$state.threads,
      posts: store => store.$state.posts
    }),
    thread () {
      return this.threads.find(thread=> thread.id === this.id)
    },
    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    addPost (eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }

      useStore().createPost(post)
    }
  }
}
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts"/>
    <PostEditor @save="addPost" />
  </div>
</template>
