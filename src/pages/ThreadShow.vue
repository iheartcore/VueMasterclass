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
      posts: sourceData.posts,
      newPostText: ''
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
    addPost () {
      const postId = 'sdfsa' + Math.random()
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
      }

      this.posts.push(post)
      this.thread.posts.push(postId)

      this.newPostText = ''
    }
  }
}
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts"/>

    <div class="col-full">
      <form @submit.prevent="addPost">
        <div class="form-group">
          <textarea id="" v-model="newPostText" name="" cols="30" rows="10"></textarea>
        </div>
        <div class="form-actions">
          <button class="btn-blue">Submit post</button>
        </div>
      </form>
    </div>
  </div>
</template>
