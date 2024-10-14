// application css
import '../css/index.scss'

// our stuff
import './utils/fetch-patch'
import ReactDOM from 'react-dom/client'
import { StatsApp } from './stats/stats-app.tsx'

addEventListener('load', function () {
  document.body.style.removeProperty('visibility')
  const mapElem = document.getElementById('app')!

  ReactDOM.createRoot(mapElem).render(<StatsApp />)
})
