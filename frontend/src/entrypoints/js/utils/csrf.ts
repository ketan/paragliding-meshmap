let csrfToken: string | null = null

async function fetchToken() {
  const response = await fetch('/api/csrf-token', {
    method: 'GET',
  })

  if (response.ok) {
    const data = await response.json()
    if (data.token) {
      return data.token
    }
  }
}

export async function fetchCsrfToken(forceReload: boolean = false) {
  if (csrfToken && !forceReload) {
    return csrfToken
  }

  for (let i = 0; i < 2; i++) {
    try {
      const token = await fetchToken()

      if (token) {
        csrfToken = token
        return csrfToken
      }
    } catch (ignore) {
      // do nothing
    }
  }

  throw 'Unable to fetch CSRF token!'
}

fetchCsrfToken()
