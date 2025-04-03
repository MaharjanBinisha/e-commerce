import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios'
import { toast } from "react-toastify";
const Product = () => {

  const { productId } = useParams();
  const { backendUrl, currency, addToCart, storeUserInteraction } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [recommendedProducts, setRecommendedProducts] = useState([]);


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

  //   const fetchRecommendations = async () => {
  //     console.log("🔍 fetchRecommendations() called");

  //     try {
  //         const userId = localStorage.getItem("userId");
  //         if (!userId) {
  //             console.warn("⚠️ No userId found in localStorage.");
  //             return;
  //         }

  //         const recommendationUrl = import.meta.env.VITE_RECOMMENDATION_URL || "http://127.0.0.1:5001/recommend";

  //         const response = await axios.post(recommendationUrl, 
  //             { user_id: userId }, 
  //             {
  //                 withCredentials: true,
  //                 headers: { "Content-Type": "application/json" }
  //             }
  //         );

  //         console.log("✅ API Response Data:", response.data);

  //         if (response.data && response.data.recommended_products) {
  //             const productIds = response.data.recommended_products; // Array of product IDs

  //             // 🔥 Fetch full product details for these IDs
  //             const productDetailsPromises = productIds.map(async (id) => {
  //                 try {
  //                     const productResponse = axios.get(`${backendUrl}/api/product/single/${productId}`);
  //                     return productResponse.data.product;
  //                 } catch (error) {
  //                     console.error(`Error fetching product details for ID ${id}:`, error);
  //                     return null;
  //                 }
  //             });

  //             const productDetails = await Promise.all(productDetailsPromises);
  //             setRecommendedProducts(productDetails.filter(product => product !== null)); // Filter out null values
  //         } else {
  //             console.warn("⚠️ No recommendations received from API.");
  //         }
  //     } catch (error) {
  //         console.error("🔥 Error fetching recommendations:", error);
  //     }
  // };
  const fetchRecommendations = async () => {
    console.log("🔍 fetchRecommendations() called");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("⚠️ No userId found in localStorage.");
        return;
      }

      const recommendationUrl = import.meta.env.VITE_RECOMMENDATION_URL || "http://127.0.0.1:5001/recommend";

      const response = await axios.post(recommendationUrl,
        { user_id: userId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("✅ API Response Data:", response.data);

      if (response.data && response.data.recommended_products) {
        setRecommendedProducts(response.data.recommended_products); // Directly use the API response
      } else {
        console.warn("⚠️ No recommendations received from API.");
      }
    } catch (error) {
      console.error("🔥 Error fetching recommendations:", error);
    }
  };



  // // Call this function inside useEffect
  // useEffect(() => {
  //   fetchProductData();
  //   fetchRecommendations(); // Fetch recommendations when product page loads
  // }, [productId]);



  // useEffect(() => {
  //   const handleInteractionAndFetch = async () => {
  //     try {
  //       await fetchProductData(); // First, fetch the product details
        
  //       if (!productData) return; // Ensure product data is available
  
  //       console.log("📌 Storing interaction before fetching recommendations...");
        
  //       await storeUserInteraction("view", {
  //         _id: productData._id,
  //         name: productData.name,
  //         price: productData.price,
  //         image: productData.image,
  //         description: productData.description,
  //         category: productData.category,
  //         subCategory: productData.subCategory,
  //         bestseller: productData.bestseller
  //       });
  
  //       console.log("🔄 Fetching recommendations after interaction...");
  //       fetchRecommendations(); // Fetch recommendations only after interaction is stored
  //     } catch (error) {
  //       console.error("🔥 Error in interaction or fetching recommendations:", error);
  //     }
  //   };
  
  //   handleInteractionAndFetch(); // Call the function inside useEffect
  // }, [productId]);  // ✅ Runs when `productId` changes
  
  useEffect(() => {
    const handleInteractionAndFetch = async () => {
      try {
        await fetchProductData(); // First, fetch the product details
        
        if (!productData) return; // Ensure product data is available
  
        console.log("📌 Storing interaction before fetching recommendations...");
        
        await storeUserInteraction("view", {
          _id: productData._id,
          name: productData.name,
          price: productData.price,
          image: productData.image,
          description: productData.description,
          category: productData.category,
          subCategory: productData.subCategory,
          bestseller: productData.bestseller
        });
  
      } catch (error) {
        console.error("🔥 Error in interaction:", error);
      }
    };
  
    handleInteractionAndFetch(); // Call the function inside useEffect
  }, [productId]);  // ✅ Runs when `productId` changes
  
  // ✅ Fetch recommendations after `productData` is updated
  useEffect(() => {
    if (productData && recommendedProducts.length === 0) {  // ✅ Prevent duplicate calls
      console.log("🔄 Fetching recommendations after product data is available...");
      fetchRecommendations();
    }
  }, [productData]); // ✅ Runs only when `productData` updates
  

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
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-200 ${item === size ? 'border-green-500' : ''}`} key={index}>{item}</button>
              ))}

            </div>
          </div>
          <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'> Add to cart</button>
          <hr className='mt-8 sm:w-4/5' />
          {/* <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Original product</p>
            <p>COD</p>
            <p>better</p>

          </div> */}
        </div>
      </div>

      {/* description and review */}
      {/* <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'> Description</b>
          <p className='border px-5 py-3 text-sm'> Reviews</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
          <p>very good</p>
          <p>nice
          </p>
        </div>
      </div> */}

      {/* Recommended Products Section */}
      <div className="mt-20">
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              // <Link
              //   to={`/product/${product.id}`} 
              //   key={product.id}
              //   className="border p-4 shadow-sm block hover:shadow-md transition duration-300"
              //   onClick={() => {
              //     console.log("🛒 Recommended Product Clicked!");

              //     const productData = { 
              //       _id: product.id, 
              //       name: product.name, 
              //       price: product.price, 
              //       image: product.image,  
              //       description: product.description,  
              //       category: product.category,  
              //       subCategory: product.subCategory,  
              //       bestseller: product.bestseller 
              //     };

              //     console.log("📦 Sending recommended product data to database:", productData);
                  
              //     storeUserInteraction("view", productData); // ✅ Store user interaction
              //   }}
              // >
              //   <img
              //     src={product.image && product.image.length > 0 ? product.image[0] : "placeholder.jpg"}
              //     alt={product.name}
              //     className="w-full h-60 object-cover mb-2 "
              //   />
              //   <h3 className="text-lg font-semibold">{product.name}</h3>
              //   <p className="text-gray-600">{currency}{product.price}</p>
              // </Link>


//               <Link
//   to={`/product/${product.id}`} 
//   key={product.id}
//   className="border p-4 shadow-sm block hover:shadow-md transition duration-300"
//   onClick={(e) => {
//     e.preventDefault(); // Prevent immediate navigation to avoid race conditions
//     console.log("🛒 Recommended Product Clicked!");

//     const newProductData = { 
//       _id: product.id, 
//       name: product.name, 
//       price: product.price, 
//       image: product.image,  
//       description: product.description,  
//       category: product.category,  
//       subCategory: product.subCategory,  
//       bestseller: product.bestseller 
//     };

//     console.log("📦 Sending recommended product data to database:", newProductData);
    
//     // Store interaction AFTER ensuring productData updates
//     setTimeout(() => {
//       storeUserInteraction("view", newProductData);
      
//       // Navigate to the new product after storing interaction
//       window.location.href = `/product/${product.id}`;
//     }, 200); // Delay to allow state updates
//   }}
// >
//   <img
//     src={product.image && product.image.length > 0 ? product.image[0] : "placeholder.jpg"}
//     alt={product.name}
//     className="w-full h-60 object-cover mb-2 "
//   />
//   <h3 className="text-lg font-semibold">{product.name}</h3>
//   <p className="text-gray-600">{currency}{product.price}</p>
// </Link>
<Link
  to={`/product/${product.id}`}
  key={product.id}
  className="border p-4 shadow-sm block hover:shadow-md transition duration-300"
  onClick={async (e) => {
    e.preventDefault(); // Prevent instant navigation

    console.log("🛒 Recommended Product Clicked!");

    const productData = {
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      bestseller: product.bestseller
    };

    console.log("📦 Sending recommended product data to database:", productData);

    await storeUserInteraction("view", productData); // Ensure it's stored before navigating

    console.log("✅ Interaction stored, now navigating...");

    // Delay navigation slightly to ensure logs appear in the console
    setTimeout(() => {
      window.location.href = `/product/${product.id}`;
    }, 500); // 500ms delay
  }}
>
  <img
    src={product.image && product.image.length > 0 ? product.image[0] : "placeholder.jpg"}
    alt={product.name}
    className="w-full h-60 object-cover mb-2"
  />
  <h3 className="text-lg font-semibold">{product.name}</h3>
  <p className="text-gray-600">{currency}{product.price}</p>
</Link>



            ))
          ) : (
            <p className="text-gray-500">No recommendations available.</p>
          )}
        </div>
      </div>

      {/*realted products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>

}

export default Product