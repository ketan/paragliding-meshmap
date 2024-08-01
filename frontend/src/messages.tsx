import ReactDOM from 'react-dom/client'
import './index.scss'
import { MessagesApp } from './messagesapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')

  ReactDOM.createRoot(document.querySelector('#app')!).render(<MessagesApp />)

})
