import { Ref } from 'vue'
import { Project } from '~/store/projects/types'

export type EditFormData = {
  id: Ref<number | null>,
  name: Ref<string>,
  nameError: Ref<string | undefined>,
  nameBlur: (e: Event) => void,
  onSubmit: (e?: Event | undefined) => Promise<Promise<void> | undefined>,
  setFieldError: (key: string, vallue: string) => void
}

export type Initial = {
  id: number | null,
  name: string,
}

export type SubmitFunction = (project: Project) => Promise<void>

export type EditFormInitial = {
  submitFunction: SubmitFunction,
  initial: Initial,
}
