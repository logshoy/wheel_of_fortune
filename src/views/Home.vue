<template>
  <div class="home">
    <wheel-panel/>
  </div>
</template>

<script lang="ts">
import WheelPanel from '@/components/WheelPanel.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    WheelPanel
  }
})
</script>
