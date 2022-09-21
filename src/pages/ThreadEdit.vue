<script>
  import { allStore } from '@/stores'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      thread() {
        const thread = allStore
          .threadStore()
          .threads.find((thread) => thread.id === this.id)

        thread.text = allStore
          .postStore()
          .posts.find((post) => post.id === thread.posts[0]).text

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
