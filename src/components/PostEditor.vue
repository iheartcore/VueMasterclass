<script>
export default {
  emits: ['save'],
  data () {
    return {
      postText: ''
    }
  },
  methods: {
    save () {
      const postId = 'sdfsa' + Math.random()
      const post = {
        id: postId,
        text: this.postText,
        publishedAt: Math.floor(Date.now() / 1000),
        userId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
      }
      this.$emit('save', { post })

      this.postText = ''
    }
  }
}
</script>

<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea id="" v-model="postText" class="form-input" name="" cols="30" rows="10"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>
