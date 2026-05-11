import React, { useState } from "react";
import { useShop } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";



function PlaceOrder() {
  const { cart, currency, Amount, backendUrl, setCart, token, setCartCount } = useShop();
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  function changeHandler(event) {
    const name = event.target.name;
    setFormData(prev => {
      return {
        ...prev,
        [name]: event.target.value
      }
    });
  }

  // 🔥 HANDLE ORDER
  const handleOrder = async () => {

    const items = cart;

    const orderData = {
      address: formData,
      items,
      amount: Amount
    }

    switch (method) {
      case "cod":

        const response = await axios.post(`${backendUrl}/api/orders/place`, orderData, { headers: { token } });
        if (response.data.success) {

          setCart([]);
          setCartCount(0);
          toast.success(response.data.message);
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
        break;

      case "stripe":


        const responseStripe = await axios.post(`${backendUrl}/api/orders/stripe`, orderData, { headers: { token } });


        if (responseStripe.data.success) {

          window.location.href =
            responseStripe.data.url;
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold">Place Order</h1>
      <p className="mt-5 mb-5">Payment Methods</p>


      {/* PAYMENT METHODS */}

      {/* stripe */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <div onClick={() => setMethod("stripe")}
          className={`p-3 border flex items-center gap-3 cursor-pointer ${method === "stripe" ? "bg-blue-300" : "bg-white"
            }`}
        >
          <img src={assets.stripe_logo} alt="Stripe Logo" />
        </div>

        {/* Cash on delivery */}

        <div onClick={() => setMethod("cod")}
          className={`p-3 border flex items-center gap-3 cursor-pointer ${method === "cod" ? "bg-blue-300" : "bg-white"
            }`}
        >
          <p>Cash On Delivery</p>
        </div>

        {/* Razorpay */}

        <div onClick={() => setMethod("Razorpay")}
          className={`p-3 border flex items-center gap-3 cursor-pointer ${method === "Razorpay" ? "bg-blue-300" : "bg-white"
            }`}
        >
          <img src={assets.razorpay_logo} alt="RazorPay Logo" />
        </div>


      </div>


      {/* CART SUMMARY */}
      <div className="border p-4 rounded mb-6">
        {cart.map(item => (
          <div key={item._id} className="flex justify-between mb-2">
            <p>{item.name} x {item.quantity}</p>
            <p>{currency}{item.price * item.quantity}</p>
          </div>
        ))}

        <hr className="my-2" />

        <h2 className="font-bold text-lg">
          Total: {currency}{Amount}
        </h2>
      </div>


      <h1 className="text-3xl font-bold text-center">
        Delivery Information
      </h1>

      {/* FIRST + LAST NAME */}

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* EMAIL */}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={changeHandler}
        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
      />

      {/* STREET */}

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={changeHandler}
        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
      />

      {/* CITY + STATE */}

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* ZIP + COUNTRY */}

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="zipcode"
          placeholder="Zipcode"
          value={formData.zipcode}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={changeHandler}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* PHONE */}

      <input
        type="number"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={changeHandler}
        className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
      />

      {/* BUTTON */}





      {/* PLACE ORDER BUTTON */}

      <br />

      <button
        onClick={handleOrder}

        className="bg-black mt-3 text-white px-6 py-3 rounded"
      >
        Place Order
      </button>

    </div>

  );
}

export default PlaceOrder;