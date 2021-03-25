import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

import { AllMutationTypes } from '../store/mutations-type'
import { useStore } from '../store'

export function useCreateWheel () {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      nameWheel: 'Колесо',
      itemsWhell: [{
        name: '',
        freq: 1,
        bg: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      }]
    }
  })

  const { value: nameWheel, errorMessage: nError, handleBlur: nBlur } = useField<string>(
    'nameWheel',
    yup.string()
      .trim()
      .required('Введите Название колеса')
  )
  const { value: itemsWhell, errorMessage: iError, handleBlur: iBlur } = useField(
    'itemsWhell',
    yup
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
  )

  const onSubmit = handleSubmit(async values => {
    console.log(values)
  })
  return {
    nameWheel,
    itemsWhell,
    nError,
    iError,
    nBlur,
    iBlur,
    isSubmitting,
    onSubmit
  }
}
