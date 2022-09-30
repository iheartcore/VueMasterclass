<script>
  import { allStore } from '@/stores'

  export default {
    created() {
      allStore.userStore().fetchAuthUser()
    },
  }
</script>

<template>
  <TheNavbar />
  <div class="container">
    <router-view />
  </div>
</template>
