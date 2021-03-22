<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal-Whell down">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  }
})
</script>
<style lang='scss'>
.modal-Whell {
    position: fixed;
    top: 60px;
    width: 80%;
    padding: 1rem;
    text-align: center;
    background: #fff;
    z-index: 1000;
    left: 50%;
    border-radius: 10px;
    transform: translateX(-50%);
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .35);
    z-index: 100;
}

.down {
  top: 25%;
}
</style>
