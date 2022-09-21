<script>
  import { mapState } from 'pinia'
  import { useCategoryStore } from '@/stores/CategoryStore'
  import { useThreadStore } from '@/stores/ThreadStore'
  export default {
    computed: {
      ...mapState(useCategoryStore, {
        categories: (store) => store.categories,
      }),
      ...mapState(useThreadStore, {
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
