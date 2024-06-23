import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Routes/root';
import Signal from './Pages/Signal/Signal.jsx'
import Home from './Pages/Home/Home.jsx'
// index.js or App.js
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Resource from './Pages/Resource_Allocation/Resource.jsx'
import Transmission_Power from './Pages/Transmission_Power/Transmission_Power.jsx'
import Multiple_Access_Throuput from './Pages/Multiple_Access/Multiple_Access_Throuput.jsx'
import Cellular_System from './Pages/Cellular_System/Cellular_System.jsx'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/Signal', element: <Signal /> },
        { path: '/Resource_Allocation', element: <Resource /> },
        { path: '/Transmission_Power', element: <Transmission_Power/> },
        { path: '/Multiple_Access', element: <Multiple_Access_Throuput /> },
        { path: '/Cellular_System', element: <Cellular_System /> }
      ]
    }
  ])
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
