<script>
import sourceData from '../data.json'

export default {
  data () {
    return {
      forums: sourceData.forums
    }
  }
}
</script>

<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <a href="#">Forums</a>
      </h2>

      <div v-for="forum in forums" :key="forum.id" class="forum-listing">
        <ForumListItem :forum="forum" />
      </div>
    </div>
  </div>
</template>

