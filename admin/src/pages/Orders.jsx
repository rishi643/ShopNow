import React, { useEffect, useContext, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from '../App';
import { LoginContext } from '../Context/LoginContext';
import { assets } from '../assets/admin_assets/assets';

function Orders() {

  const { token } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);
  const [statusvalue, setStatusValue] = useState("Order Placed");


  async function ChangeStatus(event, userId) {

    try {

      const response = await axios.post(`${backendUrl}/api/orders/status`, { value: event.target.value, userId }, {
        headers: {
          token
        }
      });
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {

    async function getOrders() {

      try {

        const response = await axios.post(
          `${backendUrl}/api/orders/list`,
          {},
          {
            headers: { token }
          }
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        }

      } catch (error) {
        toast.error(error.message);
      }
    }

    getOrders();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-8 text-center">
        My Orders
      </h1>

      {
        orders.length > 0 ? (


          <div className="flex flex-col gap-6  mx-auto">

            {
              orders.map((order, index) => (
                <div className='grid grid-rows-3 md:grid-rows-1 p-4 md:grid-cols-[140px_1fr_1fr] border-2 w-auto justify-items-center border-black items-center'>

                  <img src={assets.parcel_icon} alt="" />
                  <div className='flex flex-col justify-self-start'>
                    <p>UserId: {order.userId}</p>

                    {
                      order.items.map(item => (
                        <p>
                          {item.name}  <br />
                          Size: {item.sizes}  <br />
                          Qty: {item.quantity}
                        </p>
                      ))
                    }


                  </div>
                  <div className='flex flex-col'>
                    <p>Payment: {order.payment ? "Completed" : "Pending"} </p>
                    <p>Status: {order.status}</p>
                    <p>Change Status</p>
                    <select onChange={(event) => {
                      ChangeStatus(event, order._id)
                    }} className='cursor-pointer' name="" id="">
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <p />
                    <p>Method: {order.paymentMethod} </p>
                    <p>Amount: ${order.amount} </p>
                    <p>Date: {order.date} </p>
                  </div>
                </div>))



            }

          </div>

        ) : (

          <div className="flex items-center justify-center h-[60vh]">

            <p className="text-2xl text-gray-500">
              No Orders Yet
            </p>

          </div>

        )
      }

    </div>
  )
}

export default Orders;