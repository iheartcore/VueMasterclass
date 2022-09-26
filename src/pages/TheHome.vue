<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'

  export default {
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
      allStore.threadStore().fetchThreads({ ids: threadIds })
    },
  }
</script>

<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
  <ThreadList :threads="threads" />
</template>
