import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { product } = props;
    const [size, setSize] = useState("S");

    const { addToCart } = useContext(ShopContext);

    const updateSize = (selectedSize) => {
        setSize(selectedSize);
        console.log(size)
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    {/* Other images */}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    {/* Rating stars */}
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div className={size === 'S' ? 'selected' : ''} onClick={() => updateSize('S')}>S</div>
                        <div className={size === 'M' ? 'selected' : ''} onClick={() => updateSize('M')}>M</div>
                        <div className={size === 'L' ? 'selected' : ''} onClick={() => updateSize('L')}>L</div>
                        <div className={size === 'XL' ? 'selected' : ''} onClick={() => updateSize('XL')}>XL</div>
                        <div className={size === 'XXL' ? 'selected' : ''} onClick={() => updateSize('XXL')}>XXL</div>
                    </div>
                    <button onClick={() => { localStorage.getItem('auth-token') ? addToCart(product.id,size) : window.location.href = "/Login" }}>Add to cart</button>

                    <p className='productdisplay-right-category'><span>Category :</span>Women , T-Shirt, Crop Top</p>
                    <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
