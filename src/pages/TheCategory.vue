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

      this.asyncDataStatus_fetched()
    },
  }
</script>

<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <h1 v-if="category">{{ category.name }}</h1>
    <CategoryListItem v-if="category" :category="category" />
  </div>
</template>
