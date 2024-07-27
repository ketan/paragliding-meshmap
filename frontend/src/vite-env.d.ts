/// <reference types="vite/client" />

declare const __GIT_SHA__: string

declare module '*?component' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
