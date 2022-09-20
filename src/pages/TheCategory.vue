<script>
import { mapState } from 'pinia'
import { useStore } from '../stores'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useStore, {
      categories: store => store.$state.categories
    }),

    category () {
      return this.categories.find(category => category.id === this.id)
    }
  }
}
</script>

<template>
  <h1>{{ category.name }}</h1>
  <CategoryListItem
      :category="category"
  />
</template>

