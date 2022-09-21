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
  }
</script>

<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
  <ThreadList :threads="threads" />
</template>
