import React, { useEffect, useState } from 'react';
import './Popular.css';
import data_product from '../Assets/data.js';
import Item from '../Item/Item';

const Popular = () => {

    const [popularProducts,setPopularProducts] = useState([]);


    // useEffect (()=>{
    //     fetch('http://localhost:4000/popularinwomen')
    //     .then((response)=>response.json)
    //     .then((data)=>setPopularProducts(data))
    // },[])


    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className='popular-item'>
                {data_product.map((item, index) => {
                    console.log(item);
                    return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                })}
            </div>
        </div>
    );
};

export default Popular;
