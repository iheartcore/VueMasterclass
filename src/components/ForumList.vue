<script>

export default {
  props: {
    forums: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-for="forum in forums" :key="forum.id" class="forum-listing">
    <ForumListItem :forum="forum" />
  </div>
</template>

