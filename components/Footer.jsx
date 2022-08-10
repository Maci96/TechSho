import React from 'react'
import {AiFillTwitterCircle, AiFillInstagram} from "react-icons/ai"
const Footer = () => {
  return (
    <div className='footer-container'>
      <p>
        2022 JSM Headphones All Rights Reserved
      </p>
      <p className="icons">
        <AiFillTwitterCircle/>
        <AiFillInstagram/>
      </p>
    </div>
  )
}

export default Footer