import React,{createContext, useState} from 'react'
import allproduct  from '../Components/Assets/all_product'
import Item from '../Components/Item/Item';
export const ShopContext = createContext(null);



const getDefaultCart=()=>{
    let cart={};
    console.log(allproduct.length)
    for(let index=0;index<allproduct.length;index++){
        cart[index]=0;
        
    }
    return cart;

}
const ShopContextProvider =(props)=>{
    const [cartItems,setCartItems]=useState(getDefaultCart());
    const addToCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
        console.log(cartItems)
    }
    
    const removeFromCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-11}))
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
    const contextValue = {allproduct,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;