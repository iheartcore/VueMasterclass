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
        const thread = findById({
          resources: allStore.threadStore().threads,
          id: this.id,
        })
        thread.text = findById({
          resources: allStore.postStore().posts,
          id: thread.posts[0],
        }).text

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
