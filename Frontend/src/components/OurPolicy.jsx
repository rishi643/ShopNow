import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function OurPolicy() {
    return (
        <div className='flex md:flex-row gap-6 items-baseline justify-center md:justify-evenly p-10 flex-col'>
            <div>
                <img src={assets.exchange_icon} alt="" />
                <h1>Easy Exchange Policy</h1>
                <p>We offer hassle free exchange</p>
            </div>
            <div>
                <img src={assets.quality_icon} alt="" />
                <h1>Easy Return Policy</h1>
                <p>7 days return Policy</p>
            </div>
            <div>
                <img src={assets.support_img} alt="" />
                <h1>Best Customer support</h1>
                <p>We offer Best Customer Support</p>
            </div>
        </div>
    )
}

export default OurPolicy