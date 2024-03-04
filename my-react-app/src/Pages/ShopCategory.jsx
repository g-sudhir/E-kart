import React from 'react'
import './CSS/ShopCategory.css'
import { useContext } from 'react';
import { ShopContext } from '../../../my-react-app/src/Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
const ShopCategory = (props) => {
  const {allproduct} = useContext(ShopContext);
  console.log(allproduct);
  return (
    <div className='shop-category'> 
      <img src={props.banner} alt="" className='shopcategory-banner'/>
      <div className='shopCategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopCategory-sort'>
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className='shopcategory-products'>
        {allproduct.map((item,i)=>{
          if(props.category===item.category){
            return <Item  key={i}  id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopCategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
