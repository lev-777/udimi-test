<script lang='ts' setup>
  import { useEditForm } from '~/composables/projects/useEditForm'
  import { Project, ProjectActions, ProjectGetters, ProjectsState } from '~/store/projects/types'
  import { Initial } from '~/composables/projects/types'
  import { Store } from 'pinia'
  import { useProjectsStore } from '~/store/projects/projectsStore'
  import { mapErrors } from '~/utils/errorMapper/veeValidate/mapErrors'

  const emit = defineEmits<{(e: 'updated', payload: Project): void}>()

  const props = defineProps({
    formInitial: {
      type: Object as PropType<Initial>,
      required: true,
    },
  })

  const projectsStore: Store<string, ProjectsState, ProjectGetters, ProjectActions> = useProjectsStore()
  const submit = async (project: Project): Promise<void> => {
    try {
      await projectsStore.editProject(<number>project.id, project.name)
      emit('updated', project)
    } catch (e: any) {
      if (e instanceof Response) {
        await mapErrors(e, setFieldError)
      }
    }
  }

  const { id, name, onSubmit, nameError, setFieldError } = useEditForm({
    submitFunction: submit,
    initial: {id: props.formInitial.id, name: props.formInitial.name}
  })
</script>

<template>
  <form @submit.prevent='onSubmit'>
    <div class="form-content">
      <div :class='["app-form-input", "w-full"]'>
        <input class='input' type='text' name='name' v-model='name' autocomplete='off'>
        <div class='error-container' v-if='nameError'>
          <small>{{ nameError }}</small>
        </div>
      </div>

      <input type='hidden' name='id' v-model='id'>
    </div>

    <div class='form-footer flex flex-end'>
      <button class='submit-button bg-dark-red c-white w-150' type='submit'>
        Save
      </button>
    </div>
  </form>
</template>

<style lang='scss' scoped>
  @import '@/assets/scss/app-form';
  form {
    width: 100%;

    .form-content {
      margin-top: 100px;

      .input {
        border: 1px solid #dadada;
        border-radius: 5px;
        padding: 15px;
        width: 100%;
        outline: none;
        box-sizing: border-box;
        font-size: 1em;
      }
    }

    .form-footer {
      margin-top: 80px;

      .submit-button {
        height: 52px;
        text-transform: none;
        text-shadow: none;
        font-size: 18px;
        border-radius: 5px;
        font-weight: 400;
        border: none;
        cursor: pointer;
      }
    }
  }
</style>
