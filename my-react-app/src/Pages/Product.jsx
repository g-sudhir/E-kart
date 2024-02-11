
import React,{useContext} from 'react'
import { ShopContext } from '../Components/Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
const Product = () => {
  
    
      const {allproduct}= useContext(ShopContext);
      const {productId}=useParams();
      console.log(productId)
      const product = allproduct.find((e)=> e.id=== Number(productId));
      console.log(product);
      return(
        <div>
          <Breadcrum product={product}/>
          <ProductDisplay product={product}/>
        </div>
      )
       
  
}

export default Product
