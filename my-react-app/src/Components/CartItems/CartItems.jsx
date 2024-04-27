import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { allproduct, cartItems, removeFromCart, getTotalCartAmount, address, updateCartItems } = useContext(ShopContext);

  function checkForCheckOut() {
    if (address && address.name !== "") {
      const data = { price: getTotalCartAmount() }
      console.log(data.price);
      fetch('https://e-kart-z1nv.onrender.com/placeorder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          updateCartItems();
        }

      }
      )

    } else {
      window.location.href = "/details";
    }
  }

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        allproduct && allproduct.length > 0 ? (
          allproduct.map((product) => {
            const variantsToRender = []; // Array to collect variants with non-zero quantities

            for (var variant in cartItems[product.id]) {
              if (cartItems[product.id][variant] > 0) {
                variantsToRender.push(variant); // Collect variant with non-zero quantity
              }
            }

            // Render each variant with non-zero quantity
            return variantsToRender.map((variant) => {
              return (
                <div key={`${product.id}-${variant}`}>
                  <div className="cartitems-format cartitems-format-main">
                    <img src={product.image} alt="" className="carticon-product-icon" />
                    <p>{product.name}</p>
                    <p>${product.new_price}</p>
                    <p>{variant}</p>
                    <button className="cartitems-quantity">{cartItems[product.id][variant]}</button>
                    <p>${product.new_price * cartItems[product.id][variant]}</p>
                    <img src={remove_icon} className="cartitems-remove-icon" alt="" onClick={() => { removeFromCart(product.id, { variant }); } } />
                  </div>
                  <hr />
                </div>
              );
            });
          })
        ) : (
          <div className="cartitems-format cartitems-format-main">No products here</div>
        )
      }



      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button onClick={checkForCheckOut}>PROCEED TO CHECK OUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have promo code, Enter here</p>
          <div className='cartitems-promobox'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
