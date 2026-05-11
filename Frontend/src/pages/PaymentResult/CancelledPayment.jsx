import React from 'react'

function CancelledPayment() {


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-200 p-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">

        {/* Cancel Icon */}

        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">

          <span className="text-5xl text-red-600">
            ✕
          </span>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>

        {/* Description */}

        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Your payment was cancelled or failed.
          No worries — your order was not completed.
        </p>

        {/* Buttons */}

        <div className="flex flex-col gap-4">

          <Link
            to="/cart"
            className="bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold"
          >
            Return To Cart
          </Link>

          <Link
            to="/collection"
            className="border border-red-600 text-red-700 hover:bg-red-50 transition py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );

}

export default CancelledPayment