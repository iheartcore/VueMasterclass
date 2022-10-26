<script>
  import { allStore } from '@/stores'

  export default {
    data() {
      return {
        showPage: false,
      }
    },
    created() {
      allStore.authStore().fetchAuthUser()
      this.$router.beforeEach(() => {
        this.showPage = false
      })
    },
    methods: {
      onPageReady() {
        this.showPage = true
      },
    },
  }
</script>

<template>
  <TheNavbar />
  <div class="container">
    <router-view v-show="showPage" :key="$route.path" @ready="onPageReady" />
    <AppLoadingIndicator v-show="!showPage" />
  </div>
</template>
