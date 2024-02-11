import React, { useContext , useRef }from 'react';
import { useState } from "react";
import './Navbar.css';
import logo from '../Assets/ekart lgoo.jpg';
import { Link } from 'react-router-dom';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import menu_icon from '../Assets/icons8-menu-50.png'
import close_menu from '../Assets/close (1).png'

const Navbar=()=>{
    const [menu,setMenu]=useState("Shop");
    const {getTotalCartItems}=useContext(ShopContext);
    const menuRef=useRef();
    const imageRef=useRef()
    const dropDown_Toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
        if (e.target.classList.contains('open')) {
            imageRef.current.src = close_menu;
        } else {
            imageRef.current.src = menu_icon;
        }
    }
    function closedown(){
        if(imageRef.current.classList.contains('open')){
            imageRef.current.src = menu_icon;
            menuRef.current.classList.remove('nav-menu-visible');
            imageRef.current.classList.remove('open');
        }
    }
    
    return (
        <div className='navbar'>
            <div className='nav-logo' style={{flexShrink:0}}>
                <img src={logo} alt="" />
            </div>
            <img src={menu_icon} ref={imageRef} alt="" onClick={dropDown_Toggle} className='nav-dropdown' />
            <ul className="nav-menu" ref={menuRef} >
                <li onClick={()=>{setMenu("Shop"); closedown()}}><Link to='/' style={{ textDecoration: 'none' }}> Shop </Link> {menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Men");closedown()}}><Link to='/Men' style={{ textDecoration: 'none' }}>Men </Link> {menu==="Men"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Women");closedown()}}><Link to='/Women' style={{ textDecoration: 'none' }}>Women </Link> {menu==="Women"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Kids");closedown()}}><Link to='/Kids' style={{ textDecoration: 'none' }}>Kids </Link> {menu==="Kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/Login"><button>Login</button></Link> 
                <Link to='/Cart'><img src={cart_icon} className='cart_icon' alt="cart_icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;