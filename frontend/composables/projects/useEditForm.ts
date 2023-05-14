import { FieldContext, FormContext, useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { EditFormData, EditFormInitial } from '~/composables/projects/types'

export function useEditForm(payload: EditFormInitial): EditFormData {
  const { handleSubmit, setFieldError }: FormContext = useForm()

  const {
    value: name,
    errorMessage: nameError,
    handleBlur: nameBlur
  }: FieldContext<string> = useField<string>(
    'name',
    yup
      .string()
      .trim()
      .required('Name cannot be blank.'),
    {
      initialValue: payload.initial.name
    }
  )

  const { value: id }: FieldContext<number> = useField<number>(
    'id',
    yup.number().required('id cannot be blank.'),
    {
      initialValue: <number>payload.initial.id
    }
  )

  const onSubmit = handleSubmit(payload.submitFunction as () => Promise<void>)

  return {
    id,
    name,
    nameError,
    nameBlur,
    onSubmit,
    setFieldError,
  }
}
