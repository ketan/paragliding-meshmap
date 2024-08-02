// application css
import './index.scss'

// our stuff
import ReactDOM from 'react-dom/client'
import MapApp from './mapapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const mapElem = document.getElementById('app')!
  ReactDOM.createRoot(mapElem).render(<MapApp mapType="Google Hybrid" />)
})
