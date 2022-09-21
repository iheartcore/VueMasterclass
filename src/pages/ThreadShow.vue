<script>
  import { mapState } from 'pinia'
  import { useThreadStore } from '@/stores/ThreadStore'
  import { usePostStore } from '@/stores/PostStore'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(useThreadStore, {
        threads: (store) => store.threads,
      }),
      ...mapState(usePostStore, {
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

        usePostStore().createPost({ post: post })
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
