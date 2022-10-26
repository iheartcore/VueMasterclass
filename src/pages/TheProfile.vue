<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
    props: {
      edit: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['ready'],
    computed: {
      ...mapState(allStore.authStore, {
        user: (store) => store.authUser,
      }),
      lastPostFetched() {
        if (this.user.posts.length === 0) return null
        return this.user.posts[this.user.posts.length - 1]
      },
    },
    async created() {
      await this.fetchUserPosts()
      this.asyncDataStatus_fetched()
    },
    methods: {
      fetchUserPosts() {
        return allStore
          .authStore()
          .fetchAuthUsersPosts({ startAfter: this.lastPostFetched })
      },
    },
  }
</script>

<template>
  <div v-if="user" class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit" :user="user" />
        <UserProfileCardEditor v-else :user="user" />

        <p class="text-xsmall text-faded text-center">
          Member since june 2003, last visited 4 hours ago
        </p>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }}'s recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <PostList v-if="user.posts" :posts="user.posts" />
        <AppInfiniteScroll
          :done="user.posts.length === user.postsCount"
          @load="fetchUserPosts"
        />
      </div>
    </div>
  </div>
</template>
