<script>
import sourceData from '../data.json'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    forum () {
      return sourceData.forums.find(forum => forum.id === this.id)
    },
    threads () {
      return sourceData.threads.filter(thread => thread.forumId === this.id)
    }
  }
}
</script>

<template>
  {{ id }}
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a thread</a>
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threads"/>
  </div>
</template>