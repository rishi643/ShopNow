import React from 'react'
import { useShop } from '../Context/ShopContext'
import Title from './Title';
import { useState, useEffect } from "react";
import ProductItem from './ProductItem';

function LatestCollection() {
    const { products } = useShop();
    const [latestcollection, setlatestcollection] = useState([]);
    useEffect(() => {
        setlatestcollection(products.slice(0, 10));
    }, [products])

    return (
        <div>
            <Title text1="Latest" text2="Collections" />
            <div className="bg-cover grid  md:grid-cols-5 grid-cols-2 bg-[url('https://img.magnific.com/free-photo/gradient-colorful-smooth-background_343694-4607.jpg')] w-90 gap-4 md:w-4xl lg:w-7xl ml-auto mr-auto  p-5 border border-amber-800">
                {
                   latestcollection.length > 0 ? latestcollection.map((item, index) => {
                        return <ProductItem key={index} id={item._id} image={item.image[0]} name={item.name} price={item.price} />
                    }) : <p>Loading! Plese Wait</p>
                }
            </div>
        </div>
    )
}

export default LatestCollection