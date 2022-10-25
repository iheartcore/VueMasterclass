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
      id: {
        type: String,
        required: true,
      },
    },
    emits: ['dirty', 'clean'],
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
    methods: {
      setDirtyOrClean(isDirty) {
        this.formIsDirty = isDirty

        if (this.formIsDirty) {
          this.$emit('dirty')
        } else {
          this.$emit('clean')
        }
      },
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Editing <em>{{ thread.title }}</em>
    </h1>
    <ThreadEditor
      :forum-id="thread.forumId"
      :thread="thread"
      @dirty="setDirtyOrClean(true)"
      @clean="setDirtyOrClean(false)"
    />
  </div>
</template>
