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
      ...mapState(allStore.categoryStore, {
        categories: (store) => store.categories,
      }),

      category() {
        return findById({
          resources: this.categories,
          id: this.id,
        })
      },
    },
  }
</script>

<template>
  <h1>{{ category.name }}</h1>
  <CategoryListItem :category="category" />
</template>
