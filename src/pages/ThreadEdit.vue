<script>
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      thread() {
        const thread = findById(allStore.threadStore().threads, this.id)
        thread.text = findById(allStore.postStore().posts, thread.posts[0]).text

        return thread
      },
    },
  }
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Editing <em>{{ thread.title }}</em>
    </h1>
    <ThreadEditor :forum-id="thread.forumId" :thread="thread" />
  </div>
</template>
