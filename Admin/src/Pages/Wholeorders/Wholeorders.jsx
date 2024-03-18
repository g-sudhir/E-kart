import React, { useContext, useState, useEffect } from 'react';
import './Order.css';
import { Link } from 'react-router-dom';
import { OrdersContext } from '../../Context/Allcontext';

function YourComponent() {
  const { orders, updateOrders } = useContext(OrdersContext);
   
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/allorders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      updateOrders(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array, so fetchOrders will only be called once when component mounts

  return (
    <div className='Orders-main'>
      {orders.map(order => (
        <div className="Order-div" key={order._id}>
            <div className="div-left">
            <li key={order.orderId}>
            <Link to={`/order/${order.orderId}`} className="order-link">
              <p>Order ID: {order.orderId}</p>
              <p>Customer: {order.address.name}</p>
            </Link>
          </li>
            </div>
            <div className="div-right">
                  <div className="price">800</div>
                  
            </div>
        </div>
      ))}
    </div>
  );
}

export default YourComponent;
