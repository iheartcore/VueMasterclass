<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'

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
        return findById(this.threads, this.id)
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
    <router-link
      :to="{ name: 'ThreadEdit', params: { id: id } }"
      class="btn-green btn-small"
    >
      Edit Thread
    </router-link>
    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" />
  </div>
</template>
