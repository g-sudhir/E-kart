import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrdersContext } from '../../Context/Allcontext';

const Order = () => {
  const { orderId} = useParams();
  const { orders ,allproducts} = useContext(OrdersContext);
  console.log(orders)
  let currentOrder;
  for(var i=0;i<orders.length;i++){
    if(orders[i].orderId==parseInt(orderId)){
      currentOrder=orders[i];
      break;
    }
  }
  console.log(currentOrder)
  return (
    <div>
      {/* Render details of currentOrder */}
      {currentOrder && (
        <div>
          <h2>Order ID: {currentOrder.orderId}</h2>
          <p>Customer Name: {currentOrder.address.name}</p>
          {/* Render other details of the order */}
        </div>
      )}
    </div>
  );
}

export default Order;
