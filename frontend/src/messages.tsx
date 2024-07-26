import './index.scss'
import ReactDOM from 'react-dom/client'
import { MessagesApp } from './messagesapp'

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
})
