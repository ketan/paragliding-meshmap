import renderToString from 'preact-render-to-string'

export const mapLegendTemplate = renderToString(
  <div className="p-4">
    <div>
      <h3 className="text-2xl">Legend</h3>
    </div>
    <div>Connected</div>
    <div>Disconnected</div>
    <div>Offline Too Long</div>
  </div>
)
