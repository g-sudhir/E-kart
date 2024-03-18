import React, { createContext, useState } from 'react';

// Create the context
export const OrdersContext = createContext(null);

// Create a provider component for the context
export const OrdersProvider = (props) => {
    const [allproducts,setallproducts] = useState([]);

    const updateProducts = (newProducts) => {
        setallproducts(newProducts);
    };
    const [orders, setOrders] = useState([]);
    
    
    const updateOrders = (newOrders) => {
        setOrders(newOrders);
        
  };




  const contextValue ={orders,allproducts,updateProducts,updateOrders};
  return (
    // Provide OrdersContext with orders state and updateOrders function
    <OrdersContext.Provider value={contextValue}>
     {props.children}
    </OrdersContext.Provider>
  );
};
