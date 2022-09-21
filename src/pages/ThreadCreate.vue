<script>
  import { allStore } from '@/stores'

  export default {
    props: {
      forumId: {
        type: String,
        required: true,
      },
    },
    computed: {
      forum() {
        return allStore
          .forumStore()
          .forums.find((forum) => forum.id === this.forumId)
      },
    },
  }
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <em>{{ forum.name }}</em>
    </h1>
    <ThreadEditor :forum-id="forum.id" />
  </div>
</template>
