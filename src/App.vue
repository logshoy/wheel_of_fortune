<template>
  <component :is="layout + '-layout'" v-if="layout"/>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, computed } from 'vue'

import MainLayout from '@/layout/MainLayout.vue'
export default defineComponent({
  setup () {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    MainLayout
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli');
html,
body {
  font-family: 'Muli', sans-serif;
  font-size: 15px;
  margin: 0;
  height: 100%;
  height: 100vh;
  color: #455a64;
  background-color: #f1f4f9;
}
div {
  margin: 0;
  padding: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='text'],
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='text']:focus,
input[type='number']:focus {
  outline: none;
  border-bottom-color: #546e7a;
}
.button {
  color: #f1f4f9;
  background-color: #919499;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  border-radius: 2px;
  padding: 3px 9px;
  min-width: 40px;
  transition: background-color 0.2s, color 0.2s;
}
.button:hover,
.button:focus {
  color: #fafcff;
  background-color: #a1a4a9;
}

li {
  list-style-type: none;
}

.button.small {
  text-transform: none;
  padding: 2px 5px;
  min-width: 20px;
}
.main-panel {
  position: relative;
  min-height: 100%;
  height: 55vh;
}
.fade-enter-active,
.fade-leave-active,
.fade-in-enter-active {
  transition: opacity 0.15s;
}
.fade-in-enter-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to,
.fade-in-enter {
  opacity: 0;
}

#app {
  text-align: center;
  margin: 0;
  min-height: 100%;
  height: 100vh;
}
</style>
