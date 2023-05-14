import { defineStore, Store, StoreDefinition } from 'pinia'
import { CookieRef, useCookie } from '#app'
import { AuthActions, AuthGettters, AuthState } from '~/store/auth/types'
import { ApiMethods, useApi } from '~/composables/api/useApi'
import { useProjectsStore } from '~/store/projects/projectsStore'

const api: ApiMethods = useApi()

export const useAuthStore: StoreDefinition<string, AuthState, AuthGettters, AuthActions> = defineStore('auth', {
  state: (): AuthState => ({
    token: null
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token
  },

  actions: {
    async authenticate(email: string, password: string): Promise<void> {
      const cookie: CookieRef<{token: string} | null> = useCookie('user-token')

      try {
        const data: AuthState = await api.post('/auth/login', {
          email, password
        })

        this.token = data.token
        cookie.value = {token: <string>data.token}
      } catch (e: any) {
        throw e
      }
    },

    async logout(): Promise<void> {
      const cookie: CookieRef<{token: string} | null> = useCookie('user-token')
      const projects: Store = useProjectsStore()

      this.token = null
      cookie.value = null
      projects.$reset()
    },
  },
})
