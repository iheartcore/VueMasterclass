<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    mixins: [asyncDataStatus],
    computed: {
      ...mapState(allStore.categoryStore, {
        categories: (store) => store.categories,
      }),
      ...mapState(allStore.threadStore, {
        threads: (store) => store.threads,
      }),
    },
    async beforeCreate() {
      const categories = await allStore.categoryStore().fetchAllCategories()
      const forumIds = categories.map((category) => category.forums).flat()
      const forums = await allStore.forumStore().fetchForums({ ids: forumIds })
      const threadIds = forums.map((forum) => forum.threads).flat()
      await allStore.threadStore().fetchThreads({ ids: threadIds })
      this.asyncDataStatus_fetched()
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
    <ThreadList :threads="threads" />
  </div>
</template>
