import React, { useContext, useState ,useEffect} from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { product } = props;
    const [size, setSize] = useState("S");

    const { addToCart,makeAlert } = useContext(ShopContext);
    
    const updateSize = (selectedSize) => {
        setSize(selectedSize);
        console.log(size)
    };


    const magnify = (imgID, zoom) => {
        var img, glass, w, h, bw;
        img = document.getElementById(imgID);
        if (!img) return; // Check if the image element exists
        /*create magnifier glass:*/
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        /*insert magnifier glass:*/
        img.parentElement.insertBefore(glass, img);
        /*set background properties for the magnifier glass:*/
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        /*execute a function when someone moves the magnifier glass over the image:*/
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
        function moveMagnifier(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /*prevent the magnifier glass from being positioned outside the image:*/
            if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
            if (x < w / zoom) {x = w / zoom;}
            if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
            if (y < h / zoom) {y = h / zoom;}
            /*set the position of the magnifier glass:*/
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /*display what the magnifier glass "sees":*/
            glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }
        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x : x, y : y};
        }
    };
    useEffect(() => {
        magnify("magnifier", 3); // Adjust the second parameter for the zoom level
    }, []);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    {/* Other images */}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' id="magnifier" src={product.image} alt="" />
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
