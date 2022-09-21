<script>
  import { mapState } from 'pinia'
  import { useCategoryStore } from '@/stores/CategoryStore'

  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(useCategoryStore, {
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
