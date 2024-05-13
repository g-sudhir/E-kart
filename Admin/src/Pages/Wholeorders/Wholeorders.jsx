import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { Link } from 'react-router-dom';
import { OrdersContext } from '../../Context/Allcontext';


function YourComponent() {
  const { orders, updateOrders } = useContext(OrdersContext);
  const [allproduct, setallproduct] = useState([]);
  const [itemsFetched, setItemsFetched] = useState([]);

  useEffect( () => {
 
    fetch('http://3.107.70.18:4000/allproducts')
            .then(response => response.json())
            .then(data => {
              console.log(data)
                setallproduct(data);
            });

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://3.107.70.18:4000/allorders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        updateOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className='Orders-main'>
        <div className="main-form-layout " style={{ color: "red" }}>
          <p>OrderId</p>
          <p>Name</p>
          <p className='product-imgs'>Image</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Status</p>
          <p>Date</p>
        </div>
        <hr />
        {orders.map((order) => {
          // Calculate total quantity for the current order
          let totalQuantity = 0;
          for (const product of order.orderproductId) {
            totalQuantity += product.quantity;
          }
          const NameOfPerson = order.address.name;
          const ImagesArray=[];
          
          order.orderproductId.map((product)=>{
            for(var i=0;i<allproduct.length;i++){
              if(product.productId == allproduct[i].id ){
                ImagesArray.push(allproduct[i].image)
              }
            
            }
          })
          function givecolor(status){
            if(status=="Order Recieved") {
                return "violet"
            } 
            else if(status=="Order packed"){
              return "yellow"
            }
            else if(status=="Order delivered"){
              return "green"
            }
          }
          return (
            <Link key={order._id} className="order-link" to={`/order/${order.orderId}`}>
              <span>
                <div className="main-form-layout">
                  <p>{order.orderId}</p>
                  <p>{NameOfPerson}</p>
                 <p class="product-imgs">
                 {
                  ImagesArray.map(image=>{
                    return <img src={image} alt={image}></img>
                  })
                  }
                  </p>
                  <p>{order.totalprice}</p>
                  <p>{totalQuantity}</p>
                  <p style={{color:(givecolor(order.status))}}>{order.status}</p>
                  <p>{order.date.split('T')[0]}</p>
                </div>
                <hr />
              </span>
            </Link>
          );
        })}
      </div>
      <hr />
    </>
  );
}

export default YourComponent;




