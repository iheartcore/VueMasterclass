<script>
  import { mapState } from 'pinia'
  import { allStore } from '@/stores'

  export default {
    props: {
      category: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapState(allStore.forumStore, {
        forums: (store) => store.$state.forums,
      }),
    },
    methods: {
      getForumsFromCategory(category) {
        return this.forums.filter((forum) => forum.categoryId === category.id)
      },
    },
  }
</script>

<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="category"
          :to="{ name: 'Category', params: { id: category.id } }"
          >{{ category.name }}</router-link
        >
        <span v-else>Forums</span>
      </h2>
      <ForumList :forums="getForumsFromCategory(category)" />
    </div>
  </div>
</template>
