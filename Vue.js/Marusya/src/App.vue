<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <div class="container">
    <Header></Header>

    <RouterView></RouterView>

    <Footer></Footer>
  </div>
</template>

<style scoped>
  header{
    display: flex;
    padding: 24px 0;
  }
</style>
