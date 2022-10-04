<script>
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
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
    async created() {
      await allStore.forumStore().fetchForum({ id: this.id })

      this.asyncDataStatus_fetched()
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Create new thread in <em>{{ forum.name }}</em>
    </h1>
    <ThreadEditor :forum-id="forum.id" />
  </div>
</template>
