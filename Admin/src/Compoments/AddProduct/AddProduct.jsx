import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useAlert } from '../Alert/Alert';
const AddProduct = () => {
  const showAlert=useAlert();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const Add_Product = async ()=>{
    
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://3.107.70.18:4000/upload',{
        method:'POST',
        headers:{
            Accept:'application/json',
        },
        body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://3.107.70.18:4000/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(product)
        }).then((res)=>res.json()).then((data)=>{
          data.success ? (setProductDetails({
            name: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: "",
          }), setImage(null),alert("product added successfully")): alert("product added failed");
          
        })
    }
  }
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input
          type="text"
          name='name'
          value={productDetails.name}
          onChange={changeHandler}
          placeholder='Type Here'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder='Type here'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder='Type here'
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          id=""
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumnail-img'
            alt=""
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default AddProduct;
