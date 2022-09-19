<script>
export default {
  props: {
    date: {
      type: Number,
      required: true
    }
  },
  methods: {
    diffForHumans (timestamp) {
      return this.$utils.format.fromNow(timestamp)
    },
    humanFriendlyDate (timestamp) {
      return this.$utils.format.date(timestamp)
    }
  }
}
</script>

<template>
  <span :title="humanFriendlyDate(date)">{{ diffForHumans(date) }}</span>
</template>
