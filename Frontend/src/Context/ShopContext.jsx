import React from "react";
import { useContext, useState, useCallback, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryfee = 10;
  const [Search, setSearch] = useState('');
  const [ShowSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [Amount, setAmount] = useState(0);
  const backendUrl = import.meta.env.VITE_BackEnd_URL;
  const [products, setProducts] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token") || null);





  useEffect(() => {
    async function getproducts() {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        toast.error(error.message);
      }

    }

    getproducts();
  }, []);


  useEffect(() => {

    async function getCartData() {

      if (token != "null") {

        const response = await axios.post(`${backendUrl}/api/cart/getusercart`, {}, {
          headers: {
            token
          }
        })

        if (response.data.success) {
          setCart(response.data.userCart)
          let count = 0;
          for (let i of response.data.userCart) {
            count = count + i.quantity;
          }
          setCartCount(count)
        }

      } else {
        return;
      }
    }


    getCartData();
  }, [token]);


  const value = {
    products,
    currency,
    deliveryfee,
    setSearch,
    setShowSearch,
    Search,
    ShowSearch,
    cart,
    setCart,
    cartCount,
    setCartCount,
    Amount,
    setAmount,
    backendUrl,
    token,
    settoken
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
};

export const useShop = () => {
  return useContext(ShopContext);
};