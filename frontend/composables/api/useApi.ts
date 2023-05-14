import isJsonResponse from './isJsonResponse'
import { CookieRef, navigateTo } from '#app'

type Method = 'GET' | 'POST'
type Data = object
type Headers = Record<string, string>

export type ApiMethods = {
  get: (url: string, headers: Headers) => Promise<any>,
  post: (url: string, data: Data | null, headers?: Headers) => Promise<any>
}

export function useApi (): ApiMethods {
  const API_HOST: string = 'https://api.quwi.com/v2'

  function request(url: string, method: Method, data: Data | null, headers: Headers): Promise<any> {
    const cookie: CookieRef<{token: string} | null> = useCookie('user-token')
    const Auth: Headers = {}

    if (cookie.value) {
      Auth.Authorization = `Bearer ${cookie.value.token}`
    }

    const common: { headers: Headers; method: Method } = {
      method,
      headers: {
        Accept: 'application/json',
        ...Auth,
        ...headers,
      },
    }

    const body: { headers: Headers; body: string } | { headers: {} } =
      data !== null
        ? {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
        : { headers: {} }

    return fetch(API_HOST + url, {
      ...common,
      ...body,
      headers: {
        ...common.headers,
        ...(body.headers as Headers),
      },
    })
      .then(async (response: Response): Promise<Response> => {
        if (response.ok) {
          return response
        }

        if (response.status === 401) {
          cookie.value = null
          await navigateTo('/')
          return response
        }

        throw response
      })
      .then((response: Response): Promise<string> => {
        if (isJsonResponse(response)) {
          return response.json()
        }
        return response.text()
      })
  }

  return {
    get: (url: string, headers: Headers = {}): Promise<any> => request(url, 'GET', null, headers),
    post: (url: string, data: Data | null = null, headers: Headers = {}): Promise<any> =>
      request(url, 'POST', data, headers),
  }
}
