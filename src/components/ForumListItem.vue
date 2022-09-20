<script>
  export default {
    props: {
      forum: {
        type: Object,
        required: true,
      },
    },
    methods: {
      threads(forum) {
        if (!forum.threads) {
          return 'threads'
        }
        const count = forum.threads?.length
        return count > 1 ? 'threads' : 'thread'
      },
    },
  }
</script>

<template>
  <div class="forum-details">
    <router-link
      :to="{ name: 'Forum', params: { id: forum.id } }"
      class="text-xlarge"
    >
      {{ forum.name }}
    </router-link>
    <p>{{ forum.description }}</p>
  </div>

  <div class="threads-count">
    <p>
      <span class="count">
        {{ forum.threads?.length ? forum.threads.length : 0 }}</span
      >
      {{ threads(forum) }}
    </p>
  </div>

  <div class="last-thread"></div>
</template>
