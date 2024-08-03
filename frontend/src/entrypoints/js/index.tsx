// application css
import '../css/index.scss'

// our stuff
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import MapApp from './maps/mapapp'
import { MessagesApp } from './messages/messagesapp'
import { RouterEventListener } from './router-event-listener'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/map'),
    element: (
      <>
        <RouterEventListener />
        <div>
          <h1>Loading</h1>
        </div>
      </>
    ),
  },
  {
    path: '/map',
    element: (
      <>
        <RouterEventListener />
        <MapApp mapType="Google Hybrid" />
      </>
    ),
  },
  {
    path: '/messages',
    element: (
      <>
        <RouterEventListener />
        <MessagesApp />
      </>
    ),
  },
])

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const mapElem = document.getElementById('app')!

  ReactDOM.createRoot(mapElem).render(<RouterProvider router={router} />)
})
