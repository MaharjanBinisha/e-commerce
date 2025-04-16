import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto px-5'>
      <div className='text-center pt-12 border-t border-gray-200'>
        <Title text1={'Contact'} text2={'us'} />
      </div>
      
      <div className='my-12 flex flex-col lg:flex-row gap-12 mb-20 items-center'>
        <div className='w-full lg:w-1/2'>
          <img 
            className='w-full h-auto rounded-lg object-cover max-h-[400px]' 
            src={assets.contact_img} 
            alt="Our store location" 
          />
        </div>
        
        <div className='w-full lg:w-1/2 space-y-8'>
          <div>
            <p className='font-semibold text-xl text-gray-600 mb-3'>Our store</p>
            <p className='text-gray-500'>Kathmandu, Nepal <br /> Naxal, Kathmandu </p>
          </div>
          
          <div>
            <p className='text-gray-500'>Phone: 1234567890 <br /> Email: ensemble@gmail.com </p>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}

export default Contact