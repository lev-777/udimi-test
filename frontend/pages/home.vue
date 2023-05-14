<script lang='ts' setup>
  import { useProjectsStore } from '~/store/projects/projectsStore'
  import { ComputedRef, onMounted } from 'vue'
  import { Project } from '~/store/projects/types'
  import ProjectsList from '~/components/projects/ProjectsList.vue'

  const emit = defineEmits<{(e: 'hasCommonError', payload: {errorText: string}): void}>()
  const projectsStore = useProjectsStore()

  onMounted(async (): Promise<void> => {
    try {
      await projectsStore.fetchProjects()
    } catch (e: any) {
      const response = await e.json()
      emit('hasCommonError', {errorText: `Unable to fetch projects. Server responded with message '${response.message}'`})
    }
  })

  const projects: ComputedRef<Project[]> = computed(() => projectsStore.getProjects)
</script>

<template>
  <projects-list :projects='projects'></projects-list>
</template>
