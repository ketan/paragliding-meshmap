import './index.scss'
import ReactDOM from 'react-dom/client'
import { MessagesApp } from './messagesapp'
import ModalApp from './modalapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')

  ReactDOM.createRoot(document.querySelector('#messages-app')!).render(<MessagesApp />)

  const div = document.createElement('div')
  document.body.appendChild(div)

  ReactDOM.createRoot(div).render(<ModalApp />)
})
