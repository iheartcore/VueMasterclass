<script>
  import { allStore } from '@/stores'

  export default {
    data() {
      return {
        showPage: false,
      }
    },
    created() {
      allStore.userStore().fetchAuthUser()
      this.$router.beforeEach(() => {
        this.showPage = false
      })
    },
  }
</script>

<template>
  <TheNavbar />
  <div class="container">
    <router-view v-show="showPage" @ready="showPage = true" />
    <div v-show="!showPage" class="push-top">loading...</div>
  </div>
</template>
