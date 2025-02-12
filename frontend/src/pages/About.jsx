import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'us'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-500'>
          <p>Curated for You Discover a personalized shopping experience that’s all about you. Our collection is carefully curated to cater to your unique style and preferences, making it easier than ever to find pieces that speak to who you are.

            Ensemble: Unveiling the New You Step into the spotlight with our latest fashion line, Ensemble. This collection is designed to help you unveil a refreshed, confident version of yourself. From chic dresses to stylish accessories, every piece is crafted to make you shine.</p>
          <p>Find Your Perfect Outfit No more endless searching! Our intuitive search and filter options help you find your ideal outfit for any occasion. Whether it’s a casual day out or a glamorous evening event, we’ve got you covered.</p>
          <b className='text-gray-800'> Our mission</b>
          <p>To empower individuals by offering a meticulously curated collection that reflects diverse styles and preferences. We strive to enhance the shopping experience with personalized recommendations, high-quality fashion, and a seamless online journey. Our goal is to help you discover and embrace your unique style, unveiling a new, confident you with every outfit.</p>
        </div>


      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'}  text2={'ENSEMEBLE'} />

      </div> 
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>No compromise in quality</b>
          <p className='text-gray-500'>good waulity</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convience</b>
          <p className='text-gray-500'>Hassele free shopping</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>good customer service</b>
          <p className='text-gray-500'>good cutomer sevice</p>
        </div>
      </div>
    
    </div>
  )
}

export default About