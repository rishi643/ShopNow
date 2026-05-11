import { useState } from 'react';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Cart from './pages/Cart';
import About from './pages/About';
import Collection from "./pages/Collection";
import Product from './pages/Product';
import PlaceOrder from "./pages/PlaceOrder"
import Login from './pages/Login';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Homepage from './pages/Homepage';
import Layout from './pages/Layout';
import { ShopContextProvider } from './Context/ShopContext';
import Register from './pages/Register';
import { UserContextProvider } from './Context/UserContext';
import Profile from './pages/Profile';
import SuccessPayment from './pages/PaymentResult/SuccessPayment';
import CancelledPayment from './pages/PaymentResult/CancelledPayment';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/about' element={<About />} />
      <Route path='/' element={<Homepage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/register' element={<Register />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/placeorder' element={<PlaceOrder />} />
      <Route path='/successStripe' element={<SuccessPayment />} />
      <Route path='/cancelStripe' element={<CancelledPayment />} />

    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShopContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ShopContextProvider>
    </>
  )
}

export default App
