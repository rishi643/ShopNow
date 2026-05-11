import React, { useState, useEffect } from "react";
import { useShop } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


function Orders() {
   const { token, cartCount, currency, cart, Amount, backendUrl } = useShop();
   const [orders, setOrders] = useState({});
   const [items, setItems] = useState([]);

   useEffect(() => {

      async function getOrders() {
         try {


            const response = await axios.post(`${backendUrl}/api/orders/userorders`, {}, {
               headers: { token }
            });


            if (response.data.success) {
               setOrders(response.data.orderData);
               setItems(response.data.orderData.items);
            } else {
               toast.error(response.data.message);
            }

         } catch (error) {
            toast.error(error.message);
         }
      }

      getOrders();

   }, [])

   return (
      <>

         <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-8">
               My Orders
            </h1>

            {
               orders.length > 0 ? (

                  <div className="flex flex-col gap-8">

                     {
                        orders.map((order, index) => (

                           <div
                              key={index}
                              className="bg-white border rounded-2xl shadow-md p-5"
                           >

                              {/* TOP SECTION */}

                              <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4">

                                 <div>

                                    <p className="font-semibold text-lg">
                                       Order ID
                                    </p>

                                    <p className="text-gray-500 text-sm break-all">
                                       {order._id}
                                    </p>

                                    <p className="text-gray-500 text-sm break-all">
                                       {order.sizes}
                                    </p>

                                    <p className="text-sm text-gray-400 mt-1">
                                       {
                                          new Date(order.date)
                                             .toLocaleString()
                                       }
                                    </p>

                                 </div>

                                 <div className="flex flex-wrap gap-3 items-start">

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                       {order.paymentMethod}
                                    </span>

                                    <span
                                       className={`
                                 px-3 py-1 rounded-full text-sm

                                 ${order.payment
                                             ? "bg-green-100 text-green-700"
                                             : "bg-red-100 text-red-700"
                                          }
                              `}
                                    >
                                       {
                                          order.payment
                                             ? "Paid"
                                             : "Pending"
                                       }
                                    </span>

                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                       {order.status}
                                    </span>

                                 </div>

                              </div>

                              {/* ITEMS */}

                              <div className="mt-5 flex flex-col gap-4">

                                 {
                                    order.items.map((item, i) => (

                                       <div
                                          key={i}
                                          className="flex flex-col sm:flex-row justify-between items-center border rounded-xl p-4 gap-4"
                                       >

                                          <div className="flex gap-4 items-center">

                                             <img
                                                src={item.image?.[0]}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg border"
                                             />

                                             <div>

                                                <p className="font-semibold text-lg">
                                                   {item.name}
                                                </p>

                                                <p className="text-gray-500 text-sm">
                                                   Quantity: {item.quantity}
                                                </p>

                                                <p className="text-gray-500 text-sm">
                                                   Sizes : {item.sizes}
                                                </p>

                                             </div>

                                          </div>

                                          <div className="font-bold text-lg">
                                             {currency}
                                             {item.price * item.quantity}
                                          </div>

                                       </div>
                                    ))
                                 }

                              </div>

                              {/* FOOTER */}

                              <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">

                                 <div>

                                    <p className="text-gray-500 text-sm">
                                       Total Amount
                                    </p>

                                    <p className="text-2xl font-bold text-green-600">
                                       {currency}
                                       {order.amount}
                                    </p>

                                 </div>

                                 <button
                                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                                 >
                                    Track Order
                                 </button>

                              </div>

                           </div>
                        ))
                     }

                  </div>

               ) : (

                  <div className="h-[60vh] flex items-center justify-center">

                     <p className="text-2xl text-gray-500">
                        No Orders Yet
                     </p>

                  </div>

               )
            }

         </div>

      </>
   )

}

export default Orders;