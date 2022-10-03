<script>
  export default {
    props: {
      post: {
        type: Object,
        default: () => ({ text: null }),
      },
    },
    emits: ['save'],
    data() {
      return {
        postText: '',
        newPost: { ...this.post },
      }
    },
    computed: {
      buttonLabel() {
        return this.post.id ? 'Update Post' : 'Submit post'
      },
    },
    methods: {
      save() {
        this.$emit('save', { post: this.newPost })

        this.newPost.text = ''
      },
    },
  }
</script>

<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id=""
          v-model="newPost.text"
          class="form-input"
          name=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">{{ buttonLabel }}</button>
      </div>
    </form>
  </div>
</template>
