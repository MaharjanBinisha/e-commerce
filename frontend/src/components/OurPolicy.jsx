import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

<div>
    <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt=""/>
    <p className='font-semibold'> Get value of your purchase</p>
    <p className='text-gray-400'> Shop with us</p>
</div>
<div>
    <img src={assets.support_img} className='w-12 m-auto mb-5' alt=""/>
    <p className='font-semibold'> Customer support</p>
    <p className='text-gray-400'> we provide best customer support</p>
</div>
<div>
    <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt=""/>
    <p className='font-semibold'> Best qualtiy</p>
    <p className='text-gray-400'> No compromise in the quality</p>
</div>
    </div>
  )
}

export default OurPolicy