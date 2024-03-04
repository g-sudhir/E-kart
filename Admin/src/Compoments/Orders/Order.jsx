import React from 'react';
import './Order.css';  // Import your CSS file

const Order = () => {
  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      <div className="order-list">
        {/* Display orders here */}
        <div className="order-item">
          <p>Order ID: 123</p>
          <p>Customer: John Doe</p>
          <p>Product: Product Name</p>
          {/* Add more order details as needed */}
        </div>
        {/* Repeat the above structure for each order */}
      </div>
    </div>
  );
}

export default Order;
