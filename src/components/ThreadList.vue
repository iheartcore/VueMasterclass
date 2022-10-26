<script>
  export default {
    props: {
      threads: {
        type: Array,
        required: true,
      },
      page: {
        type: Number,
        default: 1,
      },
      perPage: {
        type: Number,
        default: 10,
      },
    },
    emits: ['fetchThreads'],
    computed: {
      threadCount() {
        return this.threads.length
      },
      totalPages() {
        if (!this.threadCount || !this.perPage) return 0
        return Math.ceil(this.threadCount / this.perPage)
      },
    },
    methods: {
      onClickHandler() {
        this.$emit('fetchThreads')
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

    <vue-awesome-paginate
      :total-items="threadCount"
      :items-per-page="perPage"
      :max-pages-shown="totalPages"
      :current-page="page"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>
