<script>
  export default {
    props: {
      threads: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <ThreadListItem
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
      />
    </div>
  </div>
</template>
