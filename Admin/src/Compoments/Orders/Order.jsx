import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrdersContext } from '../../Context/Allcontext';
import { useRef } from 'react';

import './order.css'
const Order = () => {
  const myRef = useRef();
  const mysecref = useRef();
  const { orderId } = useParams();
  const { orders, allproducts } = useContext(OrdersContext);

  let currentOrder;
  <div className="main-form-layout">
    <p>OrderID</p>
    <p>Image</p>
    <p>Name</p>
    <p>Quantity</p>
    <p>Price</p>
    <p>Date</p>
    <p>Status</p>

  </div>



  function givecolor(status) {
    if (status == "Order packed") {
      if (currentOrder.status == "Order delivered" || currentOrder.status == status) {
        return {
          backgroundColor: "yellow",
          color: "white",
          border: "1px solid yellow"
        }
      }
      else {
        return {};
      }
    }
    else if (status == "Order delivered") {
      if (currentOrder.status == status) {
        return {
          backgroundColor: "green",
          color: "white",
          border: "1px solid green"
        }
      }
      else {
        return {};
      }
    }
  }

  async function makeupdate(status) {
    
    try {
      const resp = await fetch("http://3.107.70.18:4000/makeupdate", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ "orderId": orderId, "status": status })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (status === "Order packed") {
          myRef.current.style.backgroundColor = "yellow";
          myRef.current.style.color = "white";
          myRef.current.style.border = "1px solid yellow";
        } else if (status === "Order delivered") {
          mysecref.current.style.backgroundColor = "green";
          mysecref.current.style.color = "white";
          mysecref.current.style.border = "1px solid green";
        }
      } else {
        console.error('Failed to update order status:', resp.status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  for (var i = 0; i < orders.length; i++) {
    if (orders[i].orderId == parseInt(orderId)) {
      currentOrder = orders[i];
      break;
    }
  }
  

 function makePrint(){
  window.print()
 }

  return (


    <>


      <div className='container'>
        <h2>Order ID: {currentOrder.orderId}</h2>
        <div className="flex-container">
          <div className="products">

            {currentOrder && (
              <div>
                <p>{currentOrder.orderproductId.map(order => {
                  var image, price, name;
                  for (var i = 0; i < allproducts.length; i++) {
                    if (allproducts[i].id == order.productId) {
                      image = allproducts[i].image;
                      price = allproducts[i].new_price;
                      name = allproducts[i].name;
                    }
                  }
                  return (
                    <div className='product-individual'>
                      <span>{order.productId}</span>
                      <span>{name}</span>
                      <img src={image}></img>
                      <span>{price}*{order.quantity}</span>
                      <span style={{ color: "red" }}>{price * order.quantity}</span>

                      <br></br>
                    </div>
                  )
                })}</p>
                {/* Render other details of the order */}
              </div>
            )}
          </div>
          <div className="packed-info">
            <div className='order-recieved'>
              <button>Order Recieved</button>

              <div className="line order-recieved"></div>
            </div>
            <div className='order-packed'>

              <button style={(givecolor("Order packed"))} onClick={() => { makeupdate("Order packed") }} ref={myRef}>Order packed</button>
              <div className="line " style={(givecolor("Order packed"))} ></div>
            </div>
            <div className='order-delivered'>

              <button className='order-delivered' style={(givecolor("Order delivered"))} onClick={() => { makeupdate("Order delivered") }} ref={mysecref}>Order delivered</button>
            </div>
          </div>
        </div>

        <div className='totalPrice' style={{ color: "red", fontSize: "20px", margin: "10px" }}>Total Price:{currentOrder.totalprice}</div>
        <div className='address-main'>
          <div className='address'>
            <h1>Address of customer:</h1>
            {
              Object.entries(currentOrder.address).map(([key, value]) => {
                // Exclude keys you don't want to render
                if (key !== '_id' && key !== 'ref' && key !== '__v') {
                  return (
                    <div key={key}>
                      <span style={{ fontWeight: "bold" }}>{key}: </span>
                      <span>{value}</span>
                    </div>
                  );
                }
                return null; // Skip rendering for excluded keys
              })
            }
          </div>
          <div className='print-button'>
            <button onClick={()=>{makePrint()}}>print bill</button>
          </div>

        </div>



      </div>
      <div className="printable-section">
        
      </div>


    </>


  );
}

export default Order;
