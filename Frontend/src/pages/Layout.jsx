import React from 'react';
import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Search from '../components/Search'
import { ToastContainer } from 'react-toastify';

function Layout() {
  return (
    <div className='w-screen min-h-screen'>
      <header>
        <NavBar />
      </header>
      <div className='w-full h-14 md:h-20'>
      </div>
      <ToastContainer />
      <Search />
      < Outlet />
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout