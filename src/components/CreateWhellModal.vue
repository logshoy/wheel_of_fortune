<template>
  <form @submit.prevent="createWheel()">
    <div class="form-control">
      <input type="text" v-model="nameWheel" placeholder="Название колеса"/>
    </div>
    <ul>
      <li class="item-of-Wheel" v-for="(item, index) in itemsOfWhell" :key="index">
        <strong>№{{index + 1}}</strong>
        <div class="form-control">
          <input type="text" @change="change" v-model="item.name" required placeholder="Название части колеса"/>
        </div>
          <div>
            <button type="button" @click="item.freq+=1">+</button>
            <input class="freq" type="number" min="1" required v-model.number="item.freq">
            <button type="button" @click="item.freq > 1 ? item.freq-=1 : null" min="1">-</button>
          </div>
          <input type="color" v-model="item.bg" />
          <button type="button" @click="deleteItem(index)">Удалить</button>
      </li>
    </ul>
    <button type="button" @click="addItemOfWheel" class="btn_Wheel">+</button>
    <button type="button" @click="createWheel" :disabled="isSubmitting">Создать Колесо</button>
  </form>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { AllMutationTypes } from '@/store/mutations-type'
export default defineComponent({
  emits: ['created'],
  setup (_, { emit }) {
    const nameWheel = ref('Колесо')
    const itemsOfWhell = ref([{
      name: '',
      freq: 1,
      bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }])
    const store = useStore()

    const addItemOfWheel = () => {
      itemsOfWhell.value.push({
        name: '',
        freq: 1,
        bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      })
    }
    const createWheel = () => {
      store.commit(AllMutationTypes.CHANGE_NAME, nameWheel.value)
      store.commit(AllMutationTypes.CHANGE_PRIZES, [...itemsOfWhell.value])
      emit('created')
    }
    const deleteItem = index => {
      itemsOfWhell.value.splice(index, 1)
    }

    return {
      nameWheel,
      itemsOfWhell,
      addItemOfWheel,
      createWheel,
      deleteItem
    }
  }
})
</script>
<style lang='scss'>
.item-of-Wheel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.btn_Wheel {
  display: flex;
}
.freq {
  width: 10%;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0 10px;
}
</style>
