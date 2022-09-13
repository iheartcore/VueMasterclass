<script>
import sourceData from '../data.json'

export default {
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  methods : {
    postById (postId) {
      return this.posts.find(p => p.id === postId).text
    },
    userById (userId) {
      return this.users.find(u => u.id === userId).name
    }
  }
}
</script>

<template>
  <div>
    Hi from PageHome!
  </div>
  <div v-for="thread in threads" :key="thread.id">
    <h2>{{ thread.title }}</h2>
    <div v-for="postId in thread.posts" :key="postId">
      <p>{{ userById(posts.find(p => p.id === postId).userId) }}</p>
      <p>{{ postById(postId) }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
