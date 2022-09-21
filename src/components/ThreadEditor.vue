<script>
  import { allStore } from '@/stores'

  export default {
    props: {
      forumId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        thread: {},
      }
    },
    methods: {
      async save() {
        const thread = await allStore
          .threadStore()
          .createThread({ thread: this.thread, forumId: this.forumId })

        this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
      },
      cancel() {
        this.$router.push({ name: 'Forum', params: { id: this.forumId } })
      },
    },
  }
</script>

<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        id="thread_title"
        v-model="thread.title"
        type="text"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        v-model="thread.content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>
