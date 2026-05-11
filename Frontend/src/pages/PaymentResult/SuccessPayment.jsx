import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router';
import { useShop } from '../../Context/ShopContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

function SuccessPayment() {

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { backendUrl } = useShop();

  useEffect(() => {

    async function verifyPayment() {

      try {

        const response = await axios.post(`${backendUrl}/api/orders/verify`, {
          orderId,
          success: true
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

    verifyPayment();

  })



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">

        {/* Success Icon */}

        <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">

          <span className="text-5xl text-green-600">
            ✓
          </span>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Successful
        </h1>

        {/* Description */}

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Your order has been placed successfully.
          Thank you for shopping with us.
        </p>

        {/* Buttons */}

        <div className="flex flex-col gap-4">

          <Link
            to="/orders"
            className="bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
          >
            View Orders
          </Link>

          <Link
            to="/collection"
            className="border border-green-600 text-green-700 hover:bg-green-50 transition py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default SuccessPayment