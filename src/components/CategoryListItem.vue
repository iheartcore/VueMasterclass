<script>
import sourceData from '../data.json'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    getForumsFromCategory (category) {
      return sourceData.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>

<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link v-if="category" :to="{ name: 'Category', params: { id: category.id } }">{{ category.name }}</router-link>
        <span v-else>Forums</span>
      </h2>
      <ForumList
          :forums="getForumsFromCategory(category)"
      />
    </div>
  </div>
</template>
