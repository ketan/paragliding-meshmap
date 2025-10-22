import { useCallback } from 'react'

export type QueryParams = Record<string, string | number | boolean | null | undefined>

function urlParts(params: QueryParams) {
  const url = new URL(window.location.href)
  const search = url.searchParams

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      search.delete(key)
    } else {
      search.set(key, String(value))
    }
  })
  return { url, search }
}

/**
 * Hook that provides utilities for inspecting and updating the current window URL.
 * - buildHref(params): returns a full URL string with params merged into current URL
 * - setParams(params, options): merges params into current URL and updates history (replace by default)
 *
 * This is SSR-safe: on server it returns helpers that are no-ops or return '#'.
 */
export function useCurrentUrl() {
  const buildHref = useCallback((params: QueryParams) => {
    const { url, search } = urlParts(params)

    url.search = search.toString()
    return url.toString()
  }, [])

  const setParams = useCallback((params: QueryParams, options?: { replace?: boolean }) => {
    const { url, search } = urlParts(params)

    url.search = search.toString()
    const newUrl = url.toString()

    if (options?.replace === false) {
      window.history.pushState({}, '', newUrl)
    } else {
      window.history.replaceState({}, '', newUrl)
    }
  }, [])

  return { buildHref, setParams }
}
