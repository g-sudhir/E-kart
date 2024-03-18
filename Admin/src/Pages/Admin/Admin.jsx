import React from 'react'
import './Admin.css'
import Sidebar from '../../Compoments/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import AddProduct from '../../Compoments/AddProduct/AddProduct'
import ListProduct from '../../Compoments/ListProduct/ListProduct'
import Wholeorder from '../../Pages/Wholeorders/Wholeorders'
import Order from '../../Compoments/Orders/Order'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
        <Route path='/listproduct' element={<ListProduct/>}></Route>
        <Route path='/orders' element={<Wholeorder/>}></Route>
        <Route path="order" element={<Order/>}>
              <Route path=":orderId" element={<Order/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Admin
