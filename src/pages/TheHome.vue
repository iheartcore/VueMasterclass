<script>
import { mapState } from 'pinia'
import { useStore } from '../stores'
export default {
  computed: {
    ...mapState(useStore, {
      categories: store => store.$state.categories,
      threads: store => store.$state.threads
    })
  }
}
</script>

<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
  <ThreadList :threads="threads" />
</template>

