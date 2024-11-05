// In `frontend/src/entrypoints/js/utils/fetch-patch.ts`
import { fetchCsrfToken } from './csrf.ts'

const currentVersion = __GIT_SHA__ // Assuming this is defined globally

const originalFetch = window.fetch

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const headers = new Headers(init?.headers)

  if (['put', 'post', 'delete', 'patch'].includes((init?.method || 'get').toLowerCase())) {
    headers.set('x-csrf-token', (await fetchCsrfToken())!)
  }

  const modifiedInit: RequestInit = {
    ...init,
    headers,
  }

  const response = await originalFetch(input, modifiedInit)

  const serverVersion = response.headers.get('X-App-Version')
  if (serverVersion && serverVersion !== currentVersion) {
    window.location.reload()
  }

  return response
}
