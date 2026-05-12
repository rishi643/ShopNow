import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

function Homepage() {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <p className='w-screen flex md:text-2xl justify-center'>Subscribe now and get 20% off</p>
      <div className='flex  p-6 justify-center w-full'>
        <form action="">
          <input className='border border-black' type="text" placeholder='enter your email' /><br />
          <button type='submit' className='font-sans mt-7 text-2xl bg-black text-white font-medium rounded-md p-4'>SUBSCRIBE</button>
        </form>
      </div>
    </>
  )
}

export default Homepage;
