<template>
  <form @submit.prevent="onSubmit()">
    <div class="form-control">
      <input type="text" v-model="nameWheel" placeholder="Название колеса" @blur="nBlur"/>
      <small v-if="nError">{{nError}}</small>
    </div>
    <ul>
      <li class="item-of-Wheel" v-for="(item, index) in itemsWheel" :key="index">
        <strong>№{{index + 1}}</strong>
        <div class="form-control">
          <input type="text" @change="change" v-model="item.name" placeholder="Название части колеса"/>
        </div>
          <div>
            <button type="button" @click="item.freq+=1">+</button>
            <input class="freq" type="number" min="1" v-model.number="item.freq">
            <button type="button" @click="item.freq > 1 ? item.freq-=1 : null" min="1">-</button>
          </div>
          <input type="color" v-model="item.bg" />
          <button type="button" @click="deleteItem(index)">Удалить</button>
          <small v-if="iError">{{iError}}</small>
      </li>
    </ul>
    <button type="button" @click="addItemOfWheel" class="btn_Wheel">+</button>
    <button type="submit" >Создать Колесо</button>
  </form>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
// import { AllMutationTypes } from '@/store/mutations-type'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
export default defineComponent({
  emits: ['created'],
  setup () {
    const item: any = [{
      name: 'Я тут',
      freq: 1,
      bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    },
    {
      name: 'Был тут',
      freq: 1,
      bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }
    ]

    const { isSubmitting, handleSubmit } = useForm({
      initialValues: {
        nameWheel: 'Колесо',
        itemsWheel: item
      }
    })

    const { value: nameWheel, errorMessage: nError, handleBlur: nBlur } = useField<string>(
      'nameWheel',
      yup.string()
        .trim()
        .required('Введите Название колеса')
    )
    const { value: itemsWheel, errorMessage: iError, handleBlur: iBlur } = useField(
      'itemsWheel',
      yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required('Обязательно'),
            freq: yup.number().positive('Не может быть отрицательным').integer('Должно быть целым').required('Обязательно'),
            bg: yup.string()
          })
        )
        .strict()
    )

    const onSubmit = handleSubmit(async values => {
      console.table(values)
    })

    const addItemOfWheel = () => {
      item.push({
        name: '',
        freq: 1,
        bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      })
    }

    // const deleteItem = index => {
    //   itemsWhell.splice(index, 1)
    // }

    return {
      addItemOfWheel,
      // deleteItem,
      nameWheel,
      itemsWheel,
      nError,
      iError,
      nBlur,
      iBlur,
      isSubmitting,
      onSubmit
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
