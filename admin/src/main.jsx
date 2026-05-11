import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import Add from './pages/Add'
import Layout from './pages/Layout.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginContextProvider from './Context/LoginContext.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path: "",
    element: <App />
  }, {
    path: "add",
    element: <Add />
  }, {
    path: "list",
    element: <List />
  }, {
    path: "orders",
    element: <Orders />
  }
  ]
}]);

createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <ToastContainer />
    <RouterProvider router={router} />
  </LoginContextProvider>
)
