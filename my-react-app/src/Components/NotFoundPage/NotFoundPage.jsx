import React from 'react'
import './NotFoundpage.css'
import page404 from '../Assets/page404.jpg'
const NotFoundPage = () => {
  return (
    <div className='page404'>
      <img src={page404}></img>
      <div>PAGE NOT FOUND ! 404</div>
    </div>
  )
}

export default NotFoundPage
