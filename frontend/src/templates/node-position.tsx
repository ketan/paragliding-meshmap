import { renderToString } from 'react-dom/server'

export function nodePositionView(text: string) {
  const view = (
    <p className="text-base font-semibold font-sans align-middle text-center node-position -mt-[3px]">
      <span className="inline-block align-middle" style={{ whiteSpaceCollapse: 'preserve' }} data-test-id="node-position--name">
        {text}
      </span>
    </p>
  )

  return renderToString(view)
}
