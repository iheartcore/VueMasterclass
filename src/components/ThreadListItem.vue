<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'

  export default {
    props: {
      thread: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapState(allStore.userStore, {
        users: (store) => store.$state.users,
      }),
    },
    methods: {
      reply(count) {
        return count === 1 ? count + ' reply' : count + ' replies'
      },
      userById(userId) {
        return findById({
          resources: this.users,
          id: userId,
        })
      },
    },
  }
</script>

<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">{{
          thread.title
        }}</router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ userById(thread.userId)?.name }}</a
        >, <AppDate :date="thread.publishedAt" />
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ reply(thread.posts?.length - 1) }}
      </p>

      <img
        :src="userById(thread.userId)?.avatar"
        alt=""
        class="avatar-medium"
      />

      <div>
        <p class="text-xsmall">
          <a href="#">{{ userById(thread.userId)?.name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :date="thread.publishedAt" />
        </p>
      </div>
    </div>
  </div>
</template>
