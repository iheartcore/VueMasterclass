<script>
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
    beforeRouteLeave() {
      if (this.formIsDirty) {
        const confirmed = window.confirm(
          'Are you sure you want to leave? Unsaved changes will be lost!'
        )
        if (!confirmed) {
          return false
        }
      }
    },
    props: {
      forumId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        formIsDirty: false,
      }
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
    <ThreadEditor
      :forum-id="forum.id"
      @dirty="formIsDirty = true"
      @clean="formIsDirty = false"
    />
  </div>
</template>
