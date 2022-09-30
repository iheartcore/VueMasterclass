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
    async created() {
      const category = await allStore
        .categoryStore()
        .fetchCategory({ id: this.id })
      allStore.forumStore().fetchForums({ ids: category.forums })
    },
  }
</script>

<template>
  <h1 v-if="category">{{ category.name }}</h1>
  <CategoryListItem v-if="category" :category="category" />
</template>
