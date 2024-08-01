import './index.scss'
import ReactDOM from 'react-dom/client'
import { MessagesApp } from './messagesapp'
import ModalComponent from './components/about-modal'

addEventListener('load', function () {
  document.body.removeAttribute('style')

  ReactDOM.createRoot(document.querySelector('#messages-app')!).render(<MessagesApp />)

  const div = document.createElement('div')
  div.classList.add('modal-app')
  document.body.appendChild(div)

  ReactDOM.createRoot(div).render(<ModalComponent />)
})
