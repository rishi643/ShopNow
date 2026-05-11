import React from 'react'

function Hero() {
  return (
    <div className='playwrite-nz-guides-regular md:text-3xl lg:text-4xl flex flex-col lg:w-5xl md:flex-row items-center justify-center gap-10 border-4 border-double md:w-2xl w-72 ml-auto mt-3 bg-gradient-to-l from-pink-600 to-amber-50 mr-auto border-pink-400'>
      <div>
        <p>______Our Bestsellers</p>
        <p>Latest Arrivels________</p>
        <p className='text-5xl text-blue-950'>Shop Now</p>
      </div>
      <img className='w-60 h-auto p-1' src="/Hero_Section_Image.jpg" alt="HeroSectionImage" />
    </div>
  )
}

export default Hero;