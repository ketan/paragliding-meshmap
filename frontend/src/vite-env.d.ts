/// <reference types="vite/client" />

declare const __GIT_SHA__: string
declare const __TRACKER_API_BASE_URL__: string

declare module '*?component' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends string ? number : T[K]
}

type ReplaceBufferWithString<T> = {
  [K in keyof T]: T[K] extends Buffer ? string : T[K]
}

type ReplaceBufferWithFileList<T> = {
  [K in keyof T]: T[K] extends Buffer ? FileList : T[K]
}

type ReplaceFileListWithString<T> = {
  [K in keyof T]: T[K] extends FileList ? string : T[K]
}

type AllNullableOrUndefined<T> = {
  [P in keyof T]?: T[P] | undefined
}
