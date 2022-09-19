<script>
import sourceData from '../data.json'

export default {
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  methods : {
    reply (count) {
      return count === 1 ? count + ' reply' : count + ' replies'
    },
    postById (postId) {
      return this.posts.find(p => p.id === postId)
    },
    userById (userId) {
      return this.users.find(u => u.id === userId)
    }
  }
}
</script>

<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">{{ thread.title }}</router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ userById(thread.userId).name }}</a>, <span :title="$utils.format.date(thread.publishedAt)">{{ $utils.format.fromNow(thread.publishedAt) }}</span>
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ reply(thread.posts.length) }}
      </p>

      <img :src="userById(thread.userId).avatar" alt="" class="avatar-medium" />

      <div>
        <p class="text-xsmall">
          <a href="#">{{ userById(thread.userId).name }}</a>
        </p>
        <p class="text-xsmall text-faded" :title="$utils.format.date(thread.publishedAt)">{{ $utils.format.fromNow(thread.publishedAt) }}</p>
      </div>
    </div>
  </div>
</template>
