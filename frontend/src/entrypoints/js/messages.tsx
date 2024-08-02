// application css
import '../css/index.scss'

// our stuff
import ReactDOM from 'react-dom/client'
import { MessagesApp } from './messages/messagesapp'

addEventListener('load', function () {
  document.body.removeAttribute('style')

  const domElem = document.querySelector('#app')
  if (domElem) {
    ReactDOM.createRoot(domElem).render(<MessagesApp />)
  } else {
    this.alert(`Dom Element not found`)
  }
})
