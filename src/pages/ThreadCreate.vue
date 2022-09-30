<script>
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'

  export default {
    props: {
      forumId: {
        type: String,
        required: true,
      },
    },
    computed: {
      forum() {
        return findById({
          resources: allStore.forumStore().forums,
          id: this.forumId,
        })
      },
    },
    created() {
      allStore.forumStore().fetchForum({ id: this.id })
    },
  }
</script>

<template>
  <div v-if="forum" class="col-full push-top">
    <h1>
      Create new thread in <em>{{ forum.name }}</em>
    </h1>
    <ThreadEditor :forum-id="forum.id" />
  </div>
</template>
