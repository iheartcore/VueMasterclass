<script>
import sourceData from '../data.json'

export default {
  data () {
    return {
      categories: sourceData.categories,
      forums: sourceData.forums,
      threads: sourceData.threads
    }
  }
}
</script>

<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
  <ForumList :forums="forums" />
  <ThreadList :threads="threads" />
</template>

