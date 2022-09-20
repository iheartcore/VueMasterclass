<script>
import sourceData from '../data.json'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    category () {
      return sourceData.categories.find(category => category.id === this.id)
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

