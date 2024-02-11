import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2>NEW ARRAIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>Hi!</p>
              <img src={hand_icon} alt="" />
            </div>
            <p> Welcome's</p>
            <p>You All...</p>

          </div>
          <div className="hero-latest-btn">
            <div>Explore New</div>
            <img src={arrow_icon} alt="" />
          </div>
      </div>
      <div className='hero-right'>
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero
