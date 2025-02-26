import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios'
import { toast } from "react-toastify";
const Product = () => {

  const { productId } = useParams();
  const { backendUrl,currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize]=useState('')

  // const fetchProductData = async () => {
  //   products.map((item) => {
  //     if (item._id === productId) {
  //       setProductData(item)
  //       setImage(item.image[0])
  //       return null;
  //     }

  //   })

  // }

  // useEffect(() => {
  //   fetchProductData();
  // }, [productId, products])




const handleAddToCart = () => {
  const token = localStorage.getItem("token"); // Check if user is logged in

  if (!token) {
    toast.error("Please login to add products to the cart", {
      
    });
    return;
  }

  addToCart(productData._id, size);
};

  

  // Fetch product data from backend
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/single/${productId}`);
      if (response.data.success) {
        setProductData(response.data.product);
        setImage(response.data.product.image[0]); // Default image
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);
  

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*products data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*product image*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />

          </div>

        </div>
        {/*product information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          {/* <div className='flex items-center gap-1 mt-2'>
         <img src="" alt="" className="w-3 5" />
         <img src="" alt="" className="w-3 5" />
         <img src="" alt="" className="w-3 5" />
         <img src="" alt="" className="w-3 5" />
         <img src="" alt="" className="w-3 5" />
          </div> */}
         <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
         <p className='mt-5 text-gray-400 md:w-4/5'>{productData.description} </p>
         <div className='flex flex-col gap-4 my-8'>
          <p> Select sizwe</p>
          <div className='flex gap-2 '>
            {productData.sizes.map((item, index)=>(
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-200 ${item===size ? 'border-green-500' : ''}`} key={index}>{item}</button>
            ))}

          </div>
         </div>
         <button onClick= {handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'> Add to cart</button>
        <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>Original product</p>
          <p>COD</p>
          <p>better</p>

        </div>
        </div>
      </div>

      {/* description and review */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'> Description</b>
         <p  className='border px-5 py-3 text-sm'> Reviews</p>
        </div>
     <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
     <p>very good</p>
     <p>nice
     </p>
     </div>
      </div>
      {/*realted products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>

}

export default Product