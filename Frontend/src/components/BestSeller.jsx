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
            <div className="md:flex grid grid-cols-2 items-start justify-center gap-4  w-full md:w-full ml-auto mr-auto  p-5 ">
                {
                 BestSeller.length > 0 ? BestSeller.map((item, index) => {
                        return <ProductItem key={index} id={item._id} image={item.image[0]} name={item.name} price={item.price}/>
                    }) : <p>Loading! Please Wait</p>
                }
            </div>
        </div>
    )
}

export default BestSeller