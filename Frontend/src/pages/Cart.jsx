import React from 'react'
import CartCollection from '../components/CartCollection'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router'

function Cart() {

  const navigate = useNavigate();

  return (
    <div className='flex text-cyan-950 flex-col items-center w-full'>
      <h1 className='text-3xl p-4 font-sans'>Your Cart Collection</h1>
      <CartCollection />
      <CartTotal />
      <button onClick={() => navigate("/placeorder")} className='bg-black md:text-sm text-[11px] cursor-pointer text-white p-2'>Proceed To Checkout</button>
    </div>
  )
}

export default Cart