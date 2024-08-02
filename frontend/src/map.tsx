// application css
import { Page } from './components/page'
import './index.scss'
// our stuff
import ReactDOM from 'react-dom/client'
import MapApp from './mapapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const appElement = document.getElementById('app')!
  ReactDOM.createRoot(appElement).render(
    <Page bannerMain={'hello'}>
      <div style={{ width: '100%', height: '100%' }}>
        <MapApp mapType="Google Hybrid" />
      </div>
    </Page>
  )
})
