import { defineStore, StoreDefinition } from 'pinia'
import { ApiMethods, useApi } from '~/composables/api/useApi'
import { Project, ProjectActions, ProjectGetters, ProjectsState } from '~/store/projects/types'

const api: ApiMethods = useApi()

export const useProjectsStore: StoreDefinition<string, ProjectsState, ProjectGetters, ProjectActions> = defineStore('projects',{
  state: (): ProjectsState => ({
    projects: []
  }),

  getters: {
    getProjects: (state: ProjectsState): Project[] => state.projects
  },

  actions: {
    async fetchProjects(): Promise<void> {
      try {
        const data = await api.get('/projects-manage/index', {pragma: 'no-cache', 'cache-control': 'no-cache'})

        this.projects = data ? data.projects : []
      } catch (e: any) {
        throw e
      }
    },

    async editProject(id: number, name: string): Promise<void> {
      try {
        await api.post(`/projects-manage/update?id=${id}`, {
          name
        })
      } catch (e: any) {
        throw e
      }
    },
  }
})
