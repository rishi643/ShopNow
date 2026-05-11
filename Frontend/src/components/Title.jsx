import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='flex gap-4 md:text-4xl text-2xl w-full justify-center p-5'>
      <span className='text-black opacity-30'>{text1}</span>
      <span className='text-black'>{text2}</span>
    </div>
  )
}

export default Title