export type AuthState = {
  token: string|null,
}

export type AuthGettters = {
  isAuthenticated: (state: AuthState) => boolean,
}

export type AuthActions = {
  authenticate: (username: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
}
