import React, { forwardRef } from 'react';
import './Hero.css';
import handIcon from '../Assets/hand_icon.png';
import arrowIcon from '../Assets/arrow.png';
import heroImage from '../Assets/shopping_bag gif.gif';
import shopup from '../Assets/shopup.png'
const Hero = forwardRef(({ scrollToNewCollections }, ref) => {
  const handleClick = () => {
    if (scrollToNewCollections) {
      
      scrollToNewCollections();
    }
  };

  return (
    
    <div className='hero' ref={ref}>
      <img className="shopup" src={shopup} alt="" />
      <div className='hero-left'>
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p className='animation'>Hi!</p>
            <img src={handIcon} alt="" />
          </div>
          <p className='animation'>Welcome's</p>
          <p className='animation'>You All...</p>
        </div>
        <div className="hero-latest-btn" onClick={handleClick}>
          <div>Explore New</div>
          <img src={arrowIcon} alt="" />
        </div>
      </div>
      <div className='hero-right'>
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
});

export default Hero;
