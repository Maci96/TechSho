import React from 'react'
import Link from "next/link";
import {urlFor} from "../lib/client"
const HeroBanner = ({heroBanner}) => {
   {/* {console.log(heroBanner)} */}
  return (
    <div className="hero-banner-container">
     
      <div>
        <p className='beats-solo'>
         {heroBanner.smallText }
        </p>
        <h3>{heroBanner.midText }</h3>
        <h1>{heroBanner.largeText }</h1>
        <img src={urlFor(heroBanner.image)} alt='Headphones' className='hero-banner-image'/>
<div>
  <Link href={"/product/ID/"+heroBanner.product}>
  <button type="button"> {heroBanner.buttonText} </button>
  </Link>
  <div className='desc'>
    <h5 >{heroBanner.desc} </h5>
    <p> {heroBanner.saleTime}   {heroBanner.discount}</p>
  </div>
</div>
      </div>
    </div>
  )
}

export default HeroBanner