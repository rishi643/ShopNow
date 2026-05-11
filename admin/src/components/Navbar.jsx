import React,{useContext} from 'react'
import { assets } from '../assets/admin_assets/assets'
import { LoginContext } from '../Context/LoginContext'

function Navbar() {

 const {setToken} = useContext(LoginContext);

  return (
    <div className="flex items-center">
        <img className="w-40 p-2" src={assets.logo} alt="" />
        <button onClick={()=>setToken(null)} className="text-white transition-transform  hover:scale-105 bg-black ml-auto cursor-pointer p-2 rounded-xl border h-10 mr-10">Logout</button>
    </div>
  )
}

export default Navbar