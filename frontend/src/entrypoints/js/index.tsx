// application css
import '../css/index.scss'

// our stuff
import ReactDOM from 'react-dom/client'
import MapApp from './maps/mapapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const mapElem = document.getElementById('app')!
  ReactDOM.createRoot(mapElem).render(<MapApp mapType="Google Hybrid" />)
})
