import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import PIC from '../assets/3.png'

export default function Navbar() {
    return (

        <div className='navLink'>
            <div className='logo'>
                <img src={PIC} alt="" />
            </div>
            <div className='navbar1'>
                <ul>
                    <li><NavLink className="Nav-item" to='/'>Home</NavLink></li>
                    <li><NavLink className="Nav-item" to='/signal' title="Signal Processing">SigProc</NavLink></li>
                    <li><NavLink className="Nav-item" to='/Resource_Allocation' title="Resource Allocation">ResAlloc</NavLink></li>
                    <li><NavLink className="Nav-item" to='/Transmission_Power' title="Transmission Power">TransPwr</NavLink></li>
                    <li><NavLink className="Nav-item" to='/Multiple_Access' title="Multiple Access Throughput">MultAcc</NavLink></li>
                    <li><NavLink className="Nav-item" to='/Cellular_System' title="Cellular System">CellSys</NavLink></li>
                </ul>
            </div>

        </div>

    )
}
