import { useCallback } from 'react'

export function useSearchParam(param: string, defaultVal?: string): [string | undefined, (value?: string) => void] {
  const getParam = useCallback(() => {
    const raw = new URLSearchParams(window.location.search).get(param)
    return raw ?? defaultVal
  }, [defaultVal, param])

  const setParam = useCallback(
    (value?: string) => {
      if (getParam() === value) {
        return
      }
      const url = new URL(window.location.href)
      if (value === undefined || value === null || value === '') {
        url.searchParams.delete(param)
      } else {
        url.searchParams.set(param, String(value))
      }
      window.history.pushState({}, '', url.toString())
    },
    [getParam, param]
  )

  return [getParam(), setParam]
}
