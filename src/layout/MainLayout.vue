<template>
  <the-navbar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
export default {
  components: { TheNavbar }
}
</script>
