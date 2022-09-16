<script>
import sourceData from '../data.json'
import PostList from '../components/PostList.vue'

export default {
  components: { PostList },
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
  }
}
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts"/>
  </div>
</template>
