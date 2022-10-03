<script>
  export default {
    props: {
      date: {
        type: [Number, Object],
        required: true,
      },
    },
    computed: {
      normalizedTimeStamp() {
        return this.date?.seconds || this.date
      },
      diffForHumans() {
        return this.$utils.format.fromNow(this.normalizedTimeStamp)
      },
      humanFriendlyDate() {
        return this.$utils.format.date(this.normalizedTimeStamp)
      },
    },
    methods: {},
  }
</script>

<template>
  <span :title="humanFriendlyDate">{{ diffForHumans }}</span>
</template>
