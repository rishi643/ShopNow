import React from 'react'
import { useShop } from '../Context/ShopContext'
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useShop();
  return (

    <Link className='group  w-full text-[20px] md:text-xl' to={`/product/${id}`}>
      <div className='overflow-hidden object-center md:w-full border-fuchsia-950 border bg-cover' >
        <img className='w-80  transition-transform duration-300 group-hover:scale-110 z-0 md:w-full h-auto' src={image} />
      </div>
      <span className="pt-2">{name}</span><br />
      <span className='text-cyan-950'>{currency}{price}</span>
    </Link>

  )
}

export default ProductItem