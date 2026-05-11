import React from 'react'
import { useShop } from '../Context/ShopContext'
import { useState, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router';

function BestSeller() {
    const { products } = useShop();
    const [BestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        setBestSeller(products.filter(item => { return item.bestseller == "true" }));
    }, [products]);
    return (
        <div>
            <Title text1="Best" text2="Seller" />
            <div className="md:flex grid grid-cols-2 justify-center gap-4 items-center  w-full md:w-full ml-auto mr-auto  p-5 ">
                {
                    BestSeller.map((item, index) => {
                        return <Link key={index} className='w-full md:w-60 text-[20px] md:text-xl' to={`./product/${item._id}`}>
                            <img className='w-80 md:w-56 border border-fuchsia-950 h-auto' src={item.image[0]} />
                            <span className="pt-2">{item.name}</span><br />
                            <span className='text-cyan-950'>${item.price}</span>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default BestSeller