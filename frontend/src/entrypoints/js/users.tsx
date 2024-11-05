// application css
import '../css/index.scss'

// our stuff
import ReactDOM from 'react-dom/client'
import { ProfileFormDataTable } from './components/all-users-table.tsx'

addEventListener('load', function () {
  document.body.style.removeProperty('visibility')
  const mapElem = document.getElementById('app')!

  ReactDOM.createRoot(mapElem).render(<ProfileFormDataTable />)
})
