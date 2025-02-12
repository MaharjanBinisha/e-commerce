import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32' alt=""/>
        <p className='w-full md:w-2/3 text-gray-400'> Ensemble </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
       <li>Home</li>
       <li>About</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'> Get in touch</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+977-7857489574</li>
            <li>Ensemble@gmail.com</li>
        </ul>
      </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'> Copyrights 2025@ ensemble- All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer