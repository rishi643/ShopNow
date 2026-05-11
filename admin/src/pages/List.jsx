import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast, ToastContainer } from 'react-toastify'

function List() {
  const [products, setProducts] = useState([]);
  const [deleted, setdelete] = useState(false);


  const removeProudct = async (item) => {

    try {

      const response = await axios.post(`${backendUrl}/api/product/remove`, { id: item._id }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })


      if (response.data.success) {
        setdelete(prev => !prev);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`)

        if (response.data.success) {
          setProducts(response.data.products)
        } else {
          toast.error(response.data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchProducts()
  }, [deleted])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />

            {/* NAME */}
            <h3 className="font-semibold text-lg">{item.name}</h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>

            {/* PRICE */}
            <p className="font-bold mt-2">$ {item.price}</p>

            {/* CATEGORY */}
            <p className="text-xs text-gray-500">
              {item.category} | {item.subCategory}
            </p>

            {/* SIZE */}
            <div className="flex gap-2 mt-2">
              {item.sizes?.map((size, i) => (
                <span
                  key={i}
                  className="border px-2 py-1 text-xs rounded"
                >
                  {size}
                </span>
              ))}
            </div>

            {/* DATE */}
            <p className="text-xs text-gray-400 mt-2">
              {new Date(item.date).toLocaleDateString()}
            </p>

            <button className="text-white transition-transform  hover:scale-105 bg-red-500  cursor-pointer p-2 rounded-sm  border text-center w-32 h-10" onClick={() => removeProudct(item)}>Remove</button>
          </div>



        ))}

      </div>
    </div>
  )
}

export default List