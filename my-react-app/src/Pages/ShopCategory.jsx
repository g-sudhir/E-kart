import React, { useState } from 'react'
import './CSS/ShopCategory.css'
import { useContext } from 'react';
import { ShopContext } from '../../../my-react-app/src/Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
import Loader from '../Components/Loader/Loader';
const ShopCategory = (props) => {
  const { allproduct } = useContext(ShopContext);
  const [sortValue, setSortValue] = useState("sort by");
  const [sortedProducts, setSortedProducts] = useState(allproduct); // State to hold sorted products
  
  // Function to handle sorting
  function changeSort(value) {
    setSortValue(value); // Update sort value

    // Sort products based on selected option
    if (value === "l2h") {
      const sortedProducts = [...allproduct].sort((a, b) => a.new_price - b.new_price);
      setSortedProducts(sortedProducts);
    } else if (value === "h2l") {
      const sortedProducts = [...allproduct].sort((a, b) => b.new_price - a.new_price);
      setSortedProducts(sortedProducts);
    }
  }

  return (
    <div className='shop-category'> 
      <img src={props.banner} alt="" className='shopcategory-banner'/>
      <div className='shopCategory-indexSort'>
        <p>
          <span>Showing 1-{sortedProducts.length}</span> out of {sortedProducts.length} products
        </p>
        <select className='shopCategory-sort' style={{cursor:"pointer"}} onChange={(e) => changeSort(e.target.value)}>
          <img src={dropdown_icon} alt="" />
          <option value="sort by">SORT BY</option>
          <option value="l2h">Low to High</option>
          <option value="h2l">High to Low</option>
        </select>
      </div>
      {allproduct.length === 0 ? (
        <><Loader/></>
      ) : (
        <>
          <div className='shopcategory-products'>
            {sortedProducts.map((item, i) => {
              if (props.category === item.category) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              } else {
                return null;
              }
            })}
          </div>
          <div className="shopCategory-loadmore">
            Explore More
          </div>
        </>
      )}
    </div>
  )
}

export default ShopCategory;


// export default ShopCategory
