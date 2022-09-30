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
      ...mapState(allStore.forumStore, {
        forums: (store) => store.forums,
      }),
      forum() {
        return findById({ resources: this.forums, id: this.id })
      },
      threads() {
        return allStore
          .threadStore()
          .threads.filter((thread) => thread.forumId === this.id)
      },
    },
    async created() {
      const forum = await allStore.forumStore().fetchForum({ id: this.id })
      const threads = await allStore
        .threadStore()
        .fetchThreads({ ids: forum.threads })

      allStore
        .userStore()
        .fetchUsers({ ids: threads.map((thread) => thread.userId) })
    },
  }
</script>

<template>
  <div v-if="forum" class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
      >
        Start a thread
      </router-link>
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>
