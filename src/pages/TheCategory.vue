<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(allStore.categoryStore, {
        categories: (store) => store.categories,
      }),

      category() {
        return this.categories.find((category) => category.id === this.id)
      },
    },
  }
</script>

<template>
  <h1>{{ category.name }}</h1>
  <CategoryListItem :category="category" />
</template>
