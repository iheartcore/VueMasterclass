<script>
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
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

        const post = findById({
          resources: allStore.postStore().posts,
          id: thread?.posts[0],
        })

        if (thread) {
          thread.text = post ? post.text : ''
        }

        return thread
      },
    },
    async created() {
      const thread = await allStore.threadStore().fetchThread({ id: this.id })
      await allStore.postStore().fetchPosts({ ids: thread.posts })
      this.asyncDataStatus_fetched()
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editing <em>{{ thread.title }}</em>
    </h1>
    <ThreadEditor :forum-id="thread.forumId" :thread="thread" />
  </div>
</template>
