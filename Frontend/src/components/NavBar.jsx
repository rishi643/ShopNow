import React from 'react'
import { NavLink, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Search from './Search';
import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../Context/ShopContext';
import { useNavigate } from 'react-router';


function NavBar() {
    let [open, setOpen] = useState(false);
    const { setShowSearch, cart, cartCount, settoken } = useShop();
    const [TotalItems, setTotalItems] = useState(0);
    const [ProfileClick, setProfileClick] = useState(false);
    const navigate = useNavigate();

    function Change() {
        setOpen(prev => !prev);
    }

    function searchChange() {
        if (location.pathname.includes("collection")) {
            setShowSearch(true);
        }
    }

    return (
        <div className='z-20 flex fixed top-0  items-center justify-between gap-5  w-full h-14 md:h-20 border-4 bg-blue-700 border-b-cyan-900'>
            <img className='w-11 h-w-11 md:w-16 md:h-16 p-1 rounded-2xl' src="/colorful-store-icon-abstract-logo-design_474888-3415.jpg" alt="No image" />
            <h1 className='font-sans font-bold text-2xl md:text-3xl lg:text-5xl text-emerald-50'>ShopNow</h1>
            <ul className='md:flex  hidden  gap-4 font-light text-emerald-50 text-lg'>
                <NavLink className={({ isActive }) =>
                    isActive ? "text-amber-600" : "text-emerald-50"
                } to='/'>Home</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "text-amber-600" : "text-emerald-50"
                } to={'/about'}>About</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "text-amber-600" : "text-emerald-50"
                } to={'/contact'}>Contact</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "text-amber-600" : "text-emerald-50"
                } to={'/collection'}>Collection</NavLink>
            </ul>
            <Link className='p-4 hidden md:block bg-amber-700  font-sans font-bold border-2 border-double transition-transform hover:scale-105' onClick={() => { window.open(import.meta.env.VITE_ADMIN_URL, "_blank") }}>Admin Panel</Link>

            <div>

            </div>
            <div className="relative group ml-auto">


                {/* Profile Icon */}
                <div onClick={()=>{setProfileClick(prev=>!prev)}} className="w-6 h-6 md:w-11  md:h-11 bg-[url('/Profile-icon.png')] bg-cover bg-center rounded-full cursor-pointer border-2 border-white hover:scale-110 transition duration-200"></div>

                {/* Dropdown */}
                <div  className= {`absolute right-0 top-10  ${ProfileClick ? "block" : "hidden"}  md:group-hover:block w-36 bg-emerald-100 border border-emerald-400 rounded-md shadow-md p-2`}>

                    <div onClick={() => navigate("/login")} className="hover:bg-emerald-200 p-2 rounded cursor-pointer">Profile</div>
                    <div onClick={() => navigate("/orders")} className="hover:bg-emerald-200 p-2 rounded cursor-pointer">Orders</div>
                    <div onClick={() => {

                        localStorage.setItem("token", "null"); settoken(null)
                    }

                    } className="hover:bg-emerald-200 p-2 rounded cursor-pointer">Logout</div>

                </div>


            </div>
            <button onClick={searchChange}>
                <img className='cursor-pointer' src={assets.search_icon} width={20} alt="search_image" />
            </button>

            <Link to={"/cart"} className="relative bg-[url('/cart-icon.png')] bg-cover md:w-12 md:mr-4 w-8 h-6 md:h-11">
                <p className='rounded-full right-1 bottom-0 absolute bg-black text-amber-50 font-light w-2 h-2 md:w-4 md:h-4 text-[5px] text-center md:text-[10px]'>{cartCount}</p>
            </Link>

            <button onClick={Change} className='md:hidden bg-amber-300 border border-double rounded-sm border-white mr-3 h-auto center'>
                <span className='p-2 text-sm font-medium'>M</span>
            </button>
            {open && <div className='animation ease-in translate-x-1 overflow-visible md:hidden absolute left-0 top-0 w-screen h-screen border-2 border-black bg-amber-50 m-0 p-0'>

                <ul className='text-black flex flex-col font-medium gap-8 text-2xl p-1'>
                    <button onClick={Change} className='text-amber-900'>Back</button>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/contact"}>Contact</Link>
                    <Link to={"/collection"}>Collection</Link>
                    <Link onClick={() => { window.open(import.meta.env.VITE_ADMIN_URL, "_blank") }}>Admin Panel</Link>
                </ul>

            </div>}
        </div>

    )
}

export default NavBar