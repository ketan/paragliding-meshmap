// application css
import { Page } from './components/page'
import './index.scss'
// our stuff
import ReactDOM from 'react-dom/client'

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const appElement = document.getElementById('app')!
  ReactDOM.createRoot(appElement).render(<Page>{<div>hello world</div>}</Page>)
})
