import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <div className='w-full back-gr'>
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  </StrictMode>,
)
