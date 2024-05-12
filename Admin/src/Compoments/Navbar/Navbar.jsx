import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/ekartlogo.jpg'
import navProfile from '../../assets/usericon.jpeg'
import { useContext } from 'react'

const Navbar = () => {
 
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <h2>Admin portal</h2>
      <img src={navProfile} alt="" />

    </div>
  )
}

export default Navbar
