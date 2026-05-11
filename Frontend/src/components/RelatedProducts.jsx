import React from 'react'
import { useShop } from '../Context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

function RelatedProducts({ category, subcategory, id }) {
    const { products } = useShop();
    const related = products.filter(item => { return (item.category == category) && (item.subCategory == subcategory) && (item._id != id) });
    return (
        <div>
            <Title text1={"Related"} text2={"Products"} />

            <div className='w-full gap-3 grid md:grid-cols-3 grid-cols-2 justify-center lg:grid-cols-4'>
                {

                    related.map(item => (
                        <ProductItem key={item._id}
                            id={item._id}
                            image={item.image[0]}
                            name={item.name}
                            price={item.price}
                        />)
                    )

                }
            </div>
        </div>
    )
}

export default RelatedProducts;