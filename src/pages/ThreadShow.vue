<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(allStore.threadStore, {
        threads: (store) => store.threads,
      }),
      ...mapState(allStore.postStore, {
        posts: (store) => store.posts,
      }),
      thread() {
        return this.threads.find((thread) => thread.id === this.id)
      },
      threadPosts() {
        return this.posts.filter((post) => post.threadId === this.id)
      },
    },
    methods: {
      addPost(eventData) {
        const post = {
          ...eventData.post,
          threadId: this.id,
        }

        allStore.postStore().createPost({ post: post })
      },
    },
  }
</script>

<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" />
  </div>
</template>
