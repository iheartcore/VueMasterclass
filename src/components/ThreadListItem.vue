<script>
import sourceData from '../data.json'
import AppDate from '../components/AppDate.vue'

export default {
  components: { AppDate },
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      users: sourceData.users
    }
  },
  methods : {
    reply (count) {
      return count === 1 ? count + ' reply' : count + ' replies'
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
        By <a href="#">{{ userById(thread.userId).name }}</a>, <AppDate :date="thread.publishedAt" />
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
        <p class="text-xsmall text-faded"><AppDate :date="thread.publishedAt" /></p>
      </div>
    </div>
  </div>
</template>
