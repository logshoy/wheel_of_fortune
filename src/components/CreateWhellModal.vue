<template>
  <input type="text" v-model="nameWheel" placeholder="Название колеса" />
  <ul>
    <li class="item-of-Wheel" v-for="(item, index) in itemsOfWhell" :key="index">
      <input type="text" @change="change" v-model="item.name" placeholder="Название части колеса"/>
      <div>
        <!-- <button @click="item.freq+=1">+</button> -->
        <input type="number" min="1" v-model.number="item.freq">
        <!-- <button @click="item.freq-=1" min="1">-</button> -->
        <input type="color" v-model="item.bg" />
      </div>
    </li>
  </ul>
  <button @click="addItemOfWheel" class="btn_Wheel">+</button>
  <button @click="createWheel">Создать Колесо</button>

</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { AllMutationTypes } from '@/store/mutations-type'
const DEFAULT_ITEM = {
  name: '',
  freq: 1,
  bg: '#e66465'
}

export default defineComponent({
  emits: ['created'],
  setup (_, { emit }) {
    const nameWheel = ref('')
    const itemsOfWhell = ref([DEFAULT_ITEM])
    const store = useStore()

    const addItemOfWheel = () => {
      itemsOfWhell.value.push({
        name: '',
        freq: 1,
        bg: '#e66465'
      })
    }

    const createWheel = () => {
      store.commit(AllMutationTypes.CHANGE_NAME, nameWheel.value)
      console.log(itemsOfWhell.value)
      store.commit(AllMutationTypes.CHANGE_PRIZES, itemsOfWhell.value)

      emit('created')
    }

    return {
      nameWheel,
      itemsOfWhell,
      addItemOfWheel,
      createWheel
    }
  }
})
</script>
<style lang='scss'>
.item-of-Wheel {
  display: flex;
  justify-content: space-between;
}
.btn_Wheel {
  display: flex;
}
</style>
