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
        perPage: 5,
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
      threadCount() {
        return this.forum.threads.length
      },
      totalPages() {
        if (!this.threadCount || !this.perPage) return 0
        return Math.ceil(this.threadCount / this.perPage)
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
      async fetchThreads(page) {
        this.page = page
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
    <ThreadList :threads="threads" />

    <vue-awesome-paginate
      v-if="totalPages > 0"
      :total-items="threadCount"
      :items-per-page="perPage"
      :max-pages-shown="totalPages"
      :current-page="page"
      :on-click="fetchThreads"
    />
  </div>
</template>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>
