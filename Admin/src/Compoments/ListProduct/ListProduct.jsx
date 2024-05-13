import React, { useContext, useEffect, useState } from 'react'
import './ListProduct.css'
import { OrdersContext } from '../../Context/Allcontext'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  const {allproducts,updateProducts} = useContext(OrdersContext);

  


  const remove_product = async (id)=>{
    await fetch('http://3.107.70.18:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json',
        
      },
      body:JSON.stringify({id:id}),
    })
    await fetchInfo();
  }

  return (
    <div className='listproduct' >
        <h1>All Product List</h1>
        <div className="listproduct-format-main headings">
          <p>Products</p>
          <p>Title</p>
          <p >OLd Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
              return <>
              <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className='listproduct-product-icon' />
                <p>{product.name}</p>
                <p className='old_price'>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img className="listproduct-remove-icon"src={cross_icon} onClick={()=>{remove_product(product.id)}} alt="" />
              </div>
              <hr />
              </>
          })}
        </div>
        
    </div>
  )
}
import './ListProduct.css'
export default ListProduct
