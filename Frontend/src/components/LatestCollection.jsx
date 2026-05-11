import React from 'react'
import { useShop } from '../Context/ShopContext'
import Title from './Title';
import { useState, useEffect } from "react";
import ProductItem from './ProductItem';

function LatestCollection() {
    const { products } = useShop();
    const [latestcollection, setlatestcollection] = useState([]);
    useEffect(() => {
        setlatestcollection(products.slice(0, 10));;
    }, [products])

    return (
        <div>
            <Title text1="Latest" text2="Collections" />
            <div className="bg-cover grid  md:grid-cols-4 grid-cols-2 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNx146PLNEyQv-a3r9TYBMTMHonO8t_HIZ7w&s')] w-80 gap-4 md:w-4xl lg:6xl ml-auto mr-auto  p-5 border border-amber-800">
                {
                    latestcollection.map((item, index) => {
                        return <ProductItem key={index} id={item._id} image={item.image[0]} name={item.name} price={item.price} />
                    })
                }
            </div>
        </div>
    )
}

export default LatestCollection