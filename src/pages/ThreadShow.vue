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
      threadPostsCount() {
        return this.threadPosts.length > 1
          ? this.threadPosts.length + ' replies'
          : this.threadPosts.length + ' reply'
      },
      threadContributorsCount() {
        if (!this.thread.contributors) {
          return 'no contributors'
        }
        return this.thread.contributors?.length > 1
          ? this.thread.contributors?.length + ' contributors'
          : this.thread.contributors?.length + ' contributor'
      },
      user() {
        return allStore.userStore().getUserById(this.thread.userId)
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
    <p>
      By
      <router-link :to="{ name: 'Profile' }" class="link-unstyled">{{
        user.name
      }}</router-link
      >,
      <AppDate :date="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
      >
        {{ threadPostsCount }} by
        {{ threadContributorsCount }}
      </span>
    </p>
    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" />
  </div>
</template>
