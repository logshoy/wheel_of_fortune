import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

import { AllMutationTypes } from '../store/mutations-type'
import { useStore } from '../store'

export function useCreateWheel () {
  const store = useStore()

  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      nameWheel: 'Колесо'
    }
  })
  const { value: nameWheel, errorMessage: nError, handleBlur: nBlur } = useField<string>(
    'name',
    yup.string()
      .trim()
      .required('Введите Название колеса')
  )
  const { value: itemName, errorMessage: iError, handleBlur: iBlur } = useField<string>(
    'itemName',
    yup.string()
      .trim()
      .required('Введите название участника')
  )
  const { value: freqItem, errorMessage: fError, handleBlur: fBlur } = useField<number>(
    'freqItem',
    yup.number()
      .required('Введите долю участника')
      .min(0, 'Доля не может быть меньше 0')
  )
  const onSubmit = handleSubmit(async values => {
    console.table(values)
    await store.commit(AllMutationTypes.CHANGE_NAME, 'values')
    // await store.commit(AllMutationTypes.CHANGE_PRIZES, values: any)
  })

  return {
    nameWheel,
    itemName,
    freqItem,
    nError,
    iError,
    fError,
    nBlur,
    iBlur,
    fBlur,
    isSubmitting,
    onSubmit
  }
}
