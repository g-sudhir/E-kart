import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  function scroll_to_top(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Adds smooth scrolling behavior
  });
  }
  return (
    <div className='item'>
       <Link to={`/product/${props.id}`}><img src={props.image} alt="" onClick={()=>(scroll_to_top())}/></Link>
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
