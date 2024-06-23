import React from 'react'
import Footer from './../Component/Footer';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';
import "./root.css"
function root() {
  return (
    <div>
      <div className='overlay'>
        <div className="card text-center">
          <div >
            <Navbar />
          </div>
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </div></div>
  )
}

export default root