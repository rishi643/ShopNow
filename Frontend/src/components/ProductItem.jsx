import React from 'react'
import { useShop } from '../Context/ShopContext'
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useShop();
  return (

    <Link className='group  w-full text-[20px] md:text-xl' to={`/product/${id}`}>
      <div className='overflow-hidden h-40 w-36  md:h-64 object-center md:w-full bg-cover' >
        <img className='w-full transition-transform duration-300 group-hover:scale-110 z-0 md:w-full h-auto' src={image} />
      </div>
      <span className="pt-2">{name}</span><br />
      <span className='text-cyan-950'>{currency}{price}</span>
    </Link>

  )
}

export default ProductItem