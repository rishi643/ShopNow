import React, { useState, useEffect } from 'react'
import { useShop } from '../Context/ShopContext'

function CartTotal() {

    const { cart, currency, setAmount, Amount } = useShop();

    useEffect(() => {
        let result = 0;
        for (let item of cart) {
            result += item.price;
            if (item.quantity > 1) {
                result *= item.quantity;
            }
        }
        result += 10;
        setAmount(result);
    }, [cart])


    return (
        <div className='p-4'>
            <h1 className='text-xl'>Your Total Cart Price: </h1>
            <p>Shipping fee: {currency} 10.00</p>
            {Amount > 0 ? <p>Total: {currency}{Amount}.00</p> : <p>Total: 0</p>}
        </div>
    )
}

export default CartTotal