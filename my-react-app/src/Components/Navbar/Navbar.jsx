import React from 'react';
import { useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import cart_icon from '../Assets/cart_icon.png';
const Navbar=()=>{
   const [menu,setMenu]=useState("Shop");


    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("Shop")}}><Link to='/' style={{ textDecoration: 'none' }}> Shop </Link> {menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Men")}}><Link to='/Men' style={{ textDecoration: 'none' }}>Men </Link> {menu==="Men"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Women")}}><Link to='/Women' style={{ textDecoration: 'none' }}>Women </Link> {menu==="Women"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Kids")}}><Link to='/Kids' style={{ textDecoration: 'none' }}>Kids </Link> {menu==="Kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/Login"><button>Login</button></Link> 
                <Link to='/Cart'><img src={cart_icon} className='cart_icon' alt="cart_icon" /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}

export default Navbar;