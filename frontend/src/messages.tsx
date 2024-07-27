import './index.scss'
import ReactDOM from 'react-dom/client'
import { MessagesApp } from './messagesapp'
import ModalApp from './modalapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const queryParams = new URLSearchParams(window.location.search)
  const from = queryParams.get('from')
  const to = queryParams.get('to')

  if (from) {
    ReactDOM.createRoot(document.querySelector('#messages-app')!).render(
      <MessagesApp from={Number(from)} to={to ? Number(to) : undefined} />
    )
  }

  const div = document.createElement('div')
  document.body.appendChild(div)

  ReactDOM.createRoot(div).render(<ModalApp />)
})
