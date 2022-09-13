<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import PageHome from './components/PageHome.vue'
export default {
  components: { PageHome },
}
</script>

<template>
  <div class="container">
    <PageHome />
  </div>
</template>

<style>
@import 'styles/app/style.css';
@import '~bootstrap/scss/bootstrap.scss';
</style>
