<script lang='ts'>
  import { Project } from '~/store/projects/types'
  import { PropType } from '@vue/runtime-core'
  import AppModal from '~/components/ui/AppModal.vue'
  import ProjectTime from './ProjectTime.vue'
  import EditForm from './EditForm.vue'
  import { Initial } from '~/composables/projects/types'
  import ProjectStatus from './ProjectStatus.vue'
  import ProjectLogo from '~/components/projects/ProjectLogo.vue'

  type Props = {
    projects: Project[]
  }

  export default {
    props: {
      projects: Object as PropType<Project[]>
    },
    components: { ProjectLogo, ProjectStatus, EditForm, ProjectTime, AppModal},

    setup(props: Props) {
      const modal: Ref<boolean> = ref(false)
      const formInitial = <Project>{
        id: null,
        name: '',
      }

      const handleProjectEdit = (_event: Event, payload: Initial): void => {
        formInitial.id = payload.id
        formInitial.name = payload.name
        modal.value = true
      }

      const handleUpdated = (updatedPayload: Project): void => {
        props.projects?.map((project: Project) => {
          if (project.id === updatedPayload.id) {
            project.name = updatedPayload.name
          }
        })
        modal.value = false
      }

      return {
        modal, formInitial, handleProjectEdit, handleUpdated
      }
    }
  }
</script>

<template>
  <div class='project-list'>
    <div
      class='card project flex flex-end bg-white clickable'
      v-for='project in projects' :key="project.id"
      @click='handleProjectEdit($event, {id: project.id, name: project.name})'
    >
      <div class='logo'>
        <project-logo :logo='project.logo_url'></project-logo>
      </div>

      <div class='title bold'>{{ project.name }}</div>

      <div class='status bold green'>
        <project-status :value='project.is_active'></project-status>
      </div>

      <div class='time-container'>
        <project-time title='time this week' :time='0'></project-time>
        <project-time title='this month' :time='0'></project-time>
        <project-time title='total' :time='project.spent_sec_all_time'></project-time>
      </div>
    </div>
  </div>

  <teleport to='body'>
    <app-modal v-if="modal" @close='modal = false'>
      <div class='project-edit-form flex'>
        <edit-form :form-initial='formInitial' @updated='handleUpdated'></edit-form>
      </div>
    </app-modal>
  </teleport>
</template>

<style lang='scss' scoped>
  @import '@/assets/scss/variables';
  @import '@/assets/scss/app-form';

  .project-list {
    margin: 25px 0 0 75px;

    @media (max-width: 1100px) {
      margin: 25px 0 0 0;
    }
  }

  .card {
    width: 760px;
    margin-bottom: 10px;
    padding: 20px 20px 20px 30px;
    align-items: center;
    border: 1px solid $light-grey;
    border-radius: 5px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 850px) {
      width: 550px;
    }

    @media (max-width: 620px) {
      width: 490px;
      padding: 10px 10px 10px 10px;
    }

    @media (max-width: 560px) {
      width: 375px;
    }
  }

  .project {
    .logo {
      margin-right: 2.3em;

      img {
        width: 70px;
      }

      @media (max-width: 620px) {
        margin-right: 0;

        img {
          width: 60px;
        }
      }
    }

    .title {
      width: 150px;
      margin-right: 14.7em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      @media (max-width: 850px) {
        margin-right: 1.7em;
      }

      @media (max-width: 620px) {
        margin-right: 1em;
      }
    }

    .status {
      margin-right: 7.3em;

      @media (max-width: 850px) {
        margin-right: 5.3em;
      }

      @media (max-width: 620px) {
        margin-right: 4em;
      }
    }

    .time-container {
      font-size: .95em;
    }
  }

  .project-edit-form {
    align-items: center;
  }
</style>
