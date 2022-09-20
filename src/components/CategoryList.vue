<script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<template>
  <CategoryListItem
    v-for="category in categories"
    :key="category.id"
    :category="category"
  />
</template>
