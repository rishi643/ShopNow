import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideBar() {
    const navigate = useNavigate();
  return (
    <div className="flex w-40 border-r-2 flex-col gap-4 p-5">
        <button className="text-white transition-transform  hover:scale-105 bg-red-500  cursor-pointer p-2 rounded-sm  border text-center w-full h-10" onClick={e=>navigate("/add")}>Add</button>
        <button className="text-white transition-transform  hover:scale-105 bg-red-500  cursor-pointer p-2 rounded-sm  border text-center w-full h-10" onClick={e=>navigate("/list")}>List</button>
        <button className="text-white transition-transform  hover:scale-105 bg-red-500  cursor-pointer p-2 rounded-sm  border text-center w-full h-10" onClick={e=>navigate("/orders")}>Orders</button>
       
    </div>
  )
}

export default SideBar