<template>
  <div class="main-panel wheel-panel">
      <Wheel ref="wheel" @result="spinCompleted" />
      <div class="wheel-footer-area">
        <div class="wheel-footer">
          <div class="wheel-result" v-html="resultText"></div>
          <a href="#" class="button" @click.prevent="startSpin">{{ spinText }}</a>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Wheel from './Wheel.vue'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'WheelPanel',
  components: {
    Wheel
  },
  setup () {
    const store = useStore()
    const spinning = ref(false)
    const spinText = ref('Spin!')
    const resultText = ref('Ready. Get set.')
    const wheel: any = ref(null)

    const spins = computed(() => store.state.main.spins)
    const winningText = computed(() => store.state.main.data.winningText)
    const prizes = computed(() => store.state.main.available)

    const spinCompleted = index => {
      const prize = prizes.value[index]
      spinning.value = false
      spinText.value = 'Spin again!'
      resultText.value = winningText.value.replace('%s', prize.name)
    }

    const startSpin = () => {
      if (!spinning.value) {
        if (prizes.value.length === 0) return

        spinning.value = true
        spinText.value = 'Spinning...'
        resultText.value = '&#8203;'
        wheel.value.startSpin()
      }
    }
    return {
      spinning,
      spinText,
      resultText,
      spins,
      winningText,
      prizes,
      spinCompleted,
      wheel,
      startSpin
    }
  }
})
</script>

<style>
.wheel-panel-content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100%;
  height: 100vh;
  z-index: 2;
}
.wheel-header-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 0 0 auto;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  background-color: rgba(241, 244, 249, 0.3);
}
.wheel-header {
  margin: 12px;
  min-width: 300px;
}
.wheel-header-title {
  display: inline-block;
  border-radius: 3px;
}
.wheel-footer-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 0 0 auto;
  background-color: rgba(241, 244, 249, 0.3);
}
.wheel-footer {
  padding: 12px;
  font-size: 18px;
  border-radius: 3px;
}
.wheel-result {
  margin-bottom: 6px;
}
.background-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}
.show-options-container {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 3;
}
.show-records-container {
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 3;
}
</style>
