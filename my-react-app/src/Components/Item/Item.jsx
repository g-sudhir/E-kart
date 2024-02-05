import React from 'react';
import './Item.css';

const Item = (props) => {
  console.log(props.image)
  return (
    <div className='item'>
       <img src={props.image} alt="" />
       <p>{props.name}</p>
       <div className='item-prices'>
           <div className='item-price-new'>
                ${props.new_price}
           </div>
       </div>
       <div className='item-price-old'>
            %{props.old_price}
       </div>
    </div>
  );
};

export default Item;
