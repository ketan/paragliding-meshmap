/// <reference types="vite/client" />

declare const __GIT_SHA__: string
declare const __TRACKER_API_BASE_URL__: string

declare module '*?component' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
