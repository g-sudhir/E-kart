import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext.js';

const Popular = () => {
    const { allproduct } = useContext(ShopContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (allproduct) {
            setLoading(false);
        }
    }, [allproduct]);

    let womenProducts = [];

    if (allproduct) {
        womenProducts = allproduct.filter(item => item.category === 'women').slice(0, 4);
    }

    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='popular-item'>
                    {womenProducts.map((item, index) => (
                        <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Popular;
