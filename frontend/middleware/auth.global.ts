import { RouteLocationNamedRaw, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '~/store/auth/authState'
import { AuthActions, AuthGettters, AuthState } from '~/store/auth/types'
import { Store } from 'pinia'
import { CookieRef, useCookie } from '#app'

export default defineNuxtRouteMiddleware(async (
  _to: RouteLocationNormalized, _from: RouteLocationNormalized
): Promise<void | false | string | RouteLocationNamedRaw> => {

  const auth: Store<string, AuthState, AuthGettters, AuthActions> = useAuthStore()
  const cookie: CookieRef<{token: string}|null> = useCookie('user-token')

  auth.token = cookie.value?.token ?? null

  if (_to.meta.auth && !auth.isAuthenticated) {
    return navigateTo('/')
  }

  if (_to.meta.guest && auth.isAuthenticated) {
    return navigateTo('home')
  }
})
