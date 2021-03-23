<template>
  <wheel-panel @createWheel="showModalCreateWheel" @resultName="showWinner" />
  <teleport to="body">
    <app-modal v-if="modalWinner" title='Победитель' @close="modalWinner = false">
      <h2>{{winner}}</h2>
      <button>Сохранить колесо?</button>
    </app-modal>
    <app-modal v-if="modalCreate" title='Я оглавление'>
      <create-wheel-modal @created="modalCreate = false"></create-wheel-modal>
    </app-modal>
  </teleport>
</template>

<script lang="ts">
import WheelPanel from '@/components/WheelPanel.vue'
import AppModal from '@/components/ui/AppModal.vue'
import CreateWheelModal from '@/components/CreateWhellModal.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const modalWinner = ref(false)
    const modalCreate = ref(false)
    const winner = ref('')
    const showWinner = winnerWheel => {
      modalWinner.value = true
      winner.value = winnerWheel
    }
    const showModalCreateWheel = () => {
      modalCreate.value = true
    }
    return {
      modalWinner,
      modalCreate,
      winner,
      showWinner,
      showModalCreateWheel
    }
  },
  components: {
    WheelPanel,
    AppModal,
    CreateWheelModal
  }
})
</script>
