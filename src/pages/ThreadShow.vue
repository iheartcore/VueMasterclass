<script>
import sourceData from '../data.json'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts
    }
  },
  computed: {
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

      this.posts.push(post)
      this.thread.posts.push(post.id)
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
