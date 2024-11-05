let csrfToken: string | null = null

export async function fetchCsrfToken(forceReload: boolean = false) {
  if (csrfToken && !forceReload) {
    return csrfToken
  }

  const response = await fetch('/api/csrf-token', {
    method: 'GET',
  })

  if (!response.ok) {
    const retryResponse = await fetch('/api/csrf-token', {
      method: 'GET',
    })

    if (!retryResponse.ok) {
      throw new Error('Failed to fetch CSRF token after retry')
    }
    const data = await response.json()
    csrfToken = data.token
    return csrfToken
  }

  const data = await response.json()
  csrfToken = data.token
  if (!csrfToken) {
    throw new Error('CSRF token was empty!')
  }
  return csrfToken
}

fetchCsrfToken()
