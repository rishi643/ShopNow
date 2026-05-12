import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useShop } from "../Context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";


function Product() {
  const { products, currency, setCart, cart, cartCount, setCartCount, token, backendUrl } = useShop();
  const { productId } = useParams();
  const [number, setNumber] = useState(0);

  function imageChange(e) {
    const Index = product.image.findIndex((IndexValue) => IndexValue == e.target.src);
    setNumber(Index);
  }


  const product = products.find(p => p._id === productId);


  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  async function SetCart() {


    let temp = null;

    if (selectedSize == null) {
      toast.error("Select One Size First");
      return;
    }

    temp = cart.find(item => (item._id === product._id && item.sizes === selectedSize));

    if (temp == null) {


      try {

        const response = await axios.post(`${backendUrl}/api/cart/addcart`, { item: { ...product, ["sizes"]: selectedSize } }, {
          headers: {
            token
          }
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setCart(prev => [...prev, { ...product, ["sizes"]: selectedSize, quantity: 1 }]);
        } else {
          toast.error(response.data.message);
        }

      } catch (error) {
        toast.error(error.message);
      }

    } else {

      try {

        temp = { ...temp, quantity: ++temp.quantity };


        const response = await axios.post(`${backendUrl}/api/cart/updatecart`, { itemQuantity: temp.quantity, itemId: product._id, selectedSize }, {
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


    }

    if (token != "null") {
      setCartCount(prev => prev + 1);
    }

  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* MAIN GRID */}

      <div className="grid relative md:grid-cols-[70px_1fr_1fr] gap-8 z-0">


        <div className="flex w-full flex-wrap md:flex-col gap-2  z-2">
          {
            product.image.map((image) => (
              <img onClick={imageChange} className="w-24 rounded-lg cursor-pointer" src={image} />
            ))
          }
        </div>



        {/* LEFT: IMAGE */}
        <div className="w-full">
          <img
            src={product.image[number]}
            alt={product.name}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col gap-4">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-semibold">
            {product.name}
          </h1>

          {
            product.bestseller == "true" ? <h1 className="text-orange-400 text-xl font-light font-serif">BestSeller</h1> : null
          }

          {/* PRICE */}
          <p className="text-xl text-gray-800 font-medium">
            {currency}{product.price}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* SIZE SELECT */}
          <div>
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition 
                    ${selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button onClick={SetCart} className="mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>

          {/* EXTRA INFO */}
          <div className="mt-4 text-sm text-gray-500">
            <p>✔ 100% Original product</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy return within 7 days</p>
          </div>

        </div>
      </div>
      <RelatedProducts category={product.category} subcategory={product.subCategory} id={product._id} />
    </div>
  );
}

export default Product;