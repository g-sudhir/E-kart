
import React,{useContext} from 'react'
import { ShopContext } from '../../../my-react-app/src/Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
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
          <DescriptionBox/>
        </div>
      )
       
  
}

export default Product
