<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'
  import { findById } from '@/helpers'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    emits: ['ready'],
    data() {
      return {
        page: 1,
        perPage: 10,
      }
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
      const threads = await allStore.threadStore().fetchThreadsByPage({
        ids: forum.threads,
        page: this.page,
        perPage: this.perPage,
      })

      await allStore
        .userStore()
        .fetchUsers({ ids: threads.map((thread) => thread.userId) })

      this.asyncDataStatus_fetched()
      this.$emit('ready')
    },
    methods: {
      async fetchThreads() {
        this.page++
        const threads = await allStore.threadStore().fetchThreadsByPage({
          ids: this.forum.threads,
          page: this.page,
          perPage: this.perPage,
        })
        await allStore
          .userStore()
          .fetchUsers({ ids: threads.map((thread) => thread.userId) })
      },
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
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
    <ThreadList
      :threads="threads"
      :page="page"
      :per-page="perPage"
      @fetch-threads="fetchThreads"
    />
  </div>
</template>
