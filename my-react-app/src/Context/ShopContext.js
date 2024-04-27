import React, { createContext, useEffect, useState } from 'react';
import Item from '../Components/Item/Item';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = [];
    for (let index = 0; index < 300; index++) {
        cart[index] = { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, 'XXL': 0 };
    }
    return cart;
}

const addressInfo = {
    name: "",
    email: "",
    address1: "",
    address2: "",
    mobile: "",
    state: "",
    district: "",
    pincode: "",
    landmark: "",
}

const ShopContextProvider = (props) => {
    const [allproduct, setallproduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [address, setaddress] = useState(addressInfo);

    useEffect(() => {
        fetch('https://e-kart-z1nv.onrender.com/allproducts')
            .then(response => response.json())
            .then(data => {
                setallproduct(data);
            });
         console.log(allproduct)
        if (localStorage.getItem('auth-token')) {
            fetch('https://e-kart-z1nv.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                fetch('https://e-kart-z1nv.onrender.com/getAddress', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: "",
                })
                .then(response => response.json())
                .then(data => {
                    setaddress(data);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
        }
    }, []);

    const addToCart = (ItemId, size) => {
        setCartItems(prev => {
            var val = (prev[ItemId][size]);
            prev[ItemId][size] = val + 1;
            return {
                ...prev,
            };
        });
        if (localStorage.getItem('auth-token')) {
            fetch('https://e-kart-z1nv.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemid": ItemId, "size": size })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error adding to cart:', error));
        }
    };
    
    const removeFromCart = (ItemId, size) => {
        var gettedsize = (size.variant);
        setCartItems(prev => ({
            ...prev,
            [ItemId]: {
                ...prev[ItemId],
                [gettedsize]: prev[ItemId][gettedsize] - 1
            }
        }));
        if (localStorage.getItem('auth-token')) {
            fetch('https://e-kart-z1nv.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemid": ItemId, "size": gettedsize })
            })
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            for (var size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    let itemInfo = allproduct.find((product) => product.id === Number(item));
                    totalAmount += itemInfo.new_price * cartItems[item][size];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            for(const size in cartItems[item]){
                if (cartItems[item][size] > 0) {
                    totalItem += cartItems[item][size];
                }
            }
        }
        return totalItem;
    }

    const updateCartItems = (newCartItems) => {
        if (localStorage.getItem('auth-token')) {
            fetch('https://e-kart-z1nv.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then(response => response.json())
            .then(data => {
                
                setCartItems(data);
            })
            .catch(error => {
                console.error('Error updating cart items:', error);
            });
        }
    };
    
    const contextValue = { allproduct, cartItems, address, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, updateCartItems };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
