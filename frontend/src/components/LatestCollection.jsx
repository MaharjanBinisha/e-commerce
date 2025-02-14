import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} =useContext(ShopContext);

   const[latestProducts,setLatestProducts]=useState([]);

   useEffect(()=>{
    setLatestProducts(products.slice(0,5));
   },[products])

  return (
    <div className='my-10'>
          <div className='text-center py-8 text-3xl'>
            <Title text1={'SHOP'} text2={'WITH US'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
            Shop with us
            </p>
          </div>
           
         {/*rendering products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              latestProducts.map((items,index)=>(
                <ProductItem key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
              ))
            }
         </div>

        </div>
  )
}

export default LatestCollection