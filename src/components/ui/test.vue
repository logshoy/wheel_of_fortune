<template>
  <div>
    <h1>vee-validate array fields</h1>

    <Form @submit="onSubmit" :validation-schema="schema">
      <Field name="nameWheel"/>
      <ErrorMessage name="nameWheel" />

      <fieldset class="InputGroup" v-for="(user, idx) in users" :key="user.id">
        <legend>User #{{ idx }}</legend>
        <label :for="`name_${idx}`">Имя части</label>
        <Field :id="`name_${idx}`" :name="`users[${idx}].name`" />
        <ErrorMessage :name="`users[${idx}].name`" />

        <label :for="`freq_${idx}`">Часть</label>
        <Field
          :id="`freq_${idx}`"
          :name="`users[${idx}].freq`"
          type="number"
        />
        <ErrorMessage :name="`users[${idx}].freq`" />
        <input type="color" v-model="user.bg" />
        <button type="button" @click="remove(user)">X</button>
      </fieldset>

      <button type="button" @click="add">Add User +</button>

      <button type="submit">Submit</button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'App',
  components: {
    Field,
    Form,
    ErrorMessage
  },
  data: () => {
    const schema = yup.object().shape({
      nameWheel: yup.string().required('Обязательно'),
      users: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required('Обязательно'),
            freq: yup.string()
              .required('Обязательно'),
            bg: yup.string()
          })
        )
        .strict()
    })

    return {
      schema,
      users: [
        {
          bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
        }
      ]
    }
  },
  methods: {
    onSubmit (values) {
      console.log(values)
    },
    add () {
      this.users.push({
        bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      })
    },
    remove (item) {
      const index = this.users.indexOf(item)
      if (index === -1) {
        return
      }

      this.users.splice(index, 1)
    }
  }
}
</script>
