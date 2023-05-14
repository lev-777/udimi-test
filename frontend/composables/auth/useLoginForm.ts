import { FieldContext, FormContext, useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth/authState'
import { Store } from 'pinia'
import { AuthActions, AuthGettters, AuthState } from '~/store/auth/types'
import { useRouter } from '#app'
import { Router } from 'vue-router'
import { LoginFormData } from '~/composables/auth/types'
import { mapErrors } from '~/utils/errorMapper/veeValidate/mapErrors'

export function useLoginForm(): LoginFormData {
  const { handleSubmit, isSubmitting, setFieldError }: FormContext = useForm()
  const auth: Store<string, AuthState, AuthGettters, AuthActions> = useAuthStore()
  const router: Router = useRouter()

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  }: FieldContext<string> = useField<string>(
    'email',
    yup
      .string()
      .trim()
      .required('Email cannot be blank.')
  )

  const MIN_LENGTH: number = 6

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  }: FieldContext<string> = useField<string>(
    'password',
    yup
      .string()
      .trim()
      .required('Password cannot be blank.')
      .min(MIN_LENGTH, `Password cannot be less than ${MIN_LENGTH} symbols`),
    {
      validateOnValueUpdate: false
    }
  )

  const onSubmit = handleSubmit(async (values: Record<string, string>): Promise<void> => {
    try {
      await auth.authenticate(values.email, values.password)
      await router.push('/home')
    } catch (e: any) {
      if (e instanceof Response) {
        await mapErrors(e, setFieldError)
      }
    }
  })

  return {
    email,
    password,
    emailError,
    passwordError,
    emailBlur,
    passwordBlur,
    onSubmit,
    isSubmitting,
  }
}
