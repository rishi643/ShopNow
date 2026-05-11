import React from 'react'
import { useShop } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';

function Search() {
  const { Search, setSearch, ShowSearch, setShowSearch } = useShop();

  function changeShow() {
    setShowSearch(false);
  }

  return (
    <div>
      {ShowSearch ?
        <div className='w-full h-16 p-5 flex justify-center items-center gap-2'>
          <input onChange={(e) => { setSearch(e.target.value) }} className='w-2xl md:w-4xl h-9 rounded-2xl border-2 border-black p-2' placeholder='Search' type="search" />
          <div>
            <img className='w-9 md:w-3' onClick={changeShow} src={assets.cross_icon} alt="Cross_icon_image" />
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Search