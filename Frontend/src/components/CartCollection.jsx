import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function CartCollection() {

    const { cart, products, currency, setCart, setCartCount, backendUrl, token } = useShop();


    async function remove(item) {
        setCartCount(prev => prev - item.quantity);
        const result = cart.filter(item2 => (item2._id != item._id || item2.sizes != item.sizes));
        setCart(result);

        try {
            const response = await axios.post(`${backendUrl}/api/cart/deletecartitem`, { itemId: item._id, selectedSize: item.sizes }, {
                headers: {
                    token
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    };

    async function changeQuantity(e, item) {

        e.preventDefault();
        const value = e.target[0].value;
        item.quantity = value;
        setCartCount(prev => { return prev + (value - prev) });

        //Update DataBase Too
        try {

            const response = await axios.post(`${backendUrl}/api/cart/updatecart`, { itemQuantity: value, itemId: item._id, selectedSize: item.sizes }, {
                headers: {
                    token
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(response.data.message);
        }
    }

    return (

        <div className='flex flex-col w-80 lg:w-4xl md:w-3xl border border-b-blue-950 h-100 overflow-scroll '>
            {
                cart.length > 0 ? cart.map(item => (
                    <div className='grid gap-1 md:gap-5  border border-black text-sm md:text-2xl items-center  grid-cols-[92px_1fr_40px]  md:grid-cols-[100px_1fr_70px]'>
                        <img src={item.image[0]} />
                        {cart.images}
                        <div className='flex items-start flex-col'>
                            <h1>{item.name}</h1>
                            <h4 className='text-xl'>{currency}{item.price}</h4>
                            <h4 className='text-xl'>Sizes:{item.sizes}</h4>
                            <button onClick={e => remove(item)} className='bg-red-600 md:text-sm text-[11px] cursor-pointer text-white p-1 rounded-sm'>Remove</button>
                        </div>
                        <form onSubmit={(e) => changeQuantity(e, item)}>
                            <input type='number' min={1} defaultValue={item.quantity} className='border-2 w-full rounded-sm items-center h-auto justify-self-center p-1 border-black' />
                            <button type='submit' className='cursor-pointer'>setQuantity</button>
                        </form>
                    </div>
                ))
                    : (<h1>No Items in your cart</h1>)
            }
        </div>
    )
}

export default CartCollection