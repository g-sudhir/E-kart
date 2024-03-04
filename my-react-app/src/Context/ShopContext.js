import React,{createContext, useEffect, useState} from 'react'

import Item from '../Components/Item/Item';
export const ShopContext = createContext(null);



const getDefaultCart=()=>{
    let cart={};
    // console.log(allproduct.length)
    for(let index=0;index<300;index++){
        cart[index]=0;
        
    }
    return cart;

}
const addressInfo ={
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
const ShopContextProvider =(props)=>{

    const  [allproduct,setallproduct] = useState([]);

    const [cartItems,setCartItems]=useState(getDefaultCart());
    const [address,setaddress]=useState(addressInfo);

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json()).then((data)=>setallproduct(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));


            fetch('http://localhost:4000/getAddress',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setaddress(data));

        }

        
    },[]);

    const addToCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemid":ItemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    const removeFromCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemid":ItemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo =allproduct.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }


    const getTotalCartItems=()=>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = {allproduct,cartItems,address,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;