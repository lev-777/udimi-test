
export type Project = {
  id: number | null,
  name: string,
  logo_url: string | null,
  is_active: number,
  spent_sec_all_time: number,
}

export type ProjectsState = {
  projects: Project[]
}

export type ProjectGetters = {
  getProjects: () => Project[]
}

export type ProjectActions = {
  fetchProjects: () => Promise<void>,
  editProject: (id: number, name: string) => Promise<void>,
}

