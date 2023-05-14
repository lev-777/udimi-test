import { Ref } from 'vue'

export interface LoginFormData {
  email: Ref<string>,
  password: Ref<string>,
  emailError: Ref<string | undefined>,
  passwordError: Ref<string | undefined>,
  emailBlur: (e: Event) => void,
  passwordBlur: (e: Event) => void,
  onSubmit: (e: Event | undefined) => Promise<Promise<void> | undefined>,
  isSubmitting: Ref<boolean>,
}
