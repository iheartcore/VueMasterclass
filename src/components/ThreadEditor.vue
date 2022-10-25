<script>
  import { allStore } from '@/stores'

  export default {
    props: {
      forumId: {
        type: String,
        required: true,
      },
      thread: {
        type: Object,
        default: null,
      },
    },
    emits: ['dirty', 'clean'],
    data() {
      return {
        formData: { ...this.thread },
      }
    },
    computed: {
      existing() {
        return !!this.formData.title
      },
    },
    watch: {
      formData: {
        handler() {
          if (
            this.formData.title !== this.thread?.title ||
            this.formData.text !== this.thread?.text
          ) {
            this.$emit('dirty')
          } else {
            this.$emit('clean')
          }
        },
        deep: true,
      },
    },
    methods: {
      async save() {
        this.$emit('clean')
        let thread = null
        if (this.thread?.id) {
          thread = await allStore
            .threadStore()
            .updateThread({ thread: this.formData })
          this.$router.push({
            name: 'ThreadShow',
            params: { id: thread?.id },
          })
        } else {
          thread = await allStore.threadStore().createThread({
            thread: this.formData,
            forumId: this.forumId,
          })
          this.$router.push({
            name: 'ThreadShow',
            params: { id: thread?.id },
          })
        }
      },
      cancel() {
        if (this.thread?.id) {
          this.$router.push({
            name: 'ThreadShow',
            params: { id: this.thread?.id },
          })
        } else {
          this.$router.push({
            name: 'Forum',
            params: { id: this.forumId },
          })
        }
      },
    },
  }
</script>

<template>
  <form v-if="formData" @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        id="thread_title"
        v-model="formData.title"
        type="text"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        v-model="formData.text"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>
