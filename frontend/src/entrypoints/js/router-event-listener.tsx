import { NavigateFunction, NavigateOptions, To, useNavigate } from 'react-router-dom'

export interface RouterEventLoad {
  to: To
  options?: NavigateOptions
}

let navigate: NavigateFunction

export function RouterEventListener() {
  navigate = useNavigate()

  return null
}

export function mainRouterNavigate(to: To, options?: NavigateOptions) {
  navigate(to, options)
}
