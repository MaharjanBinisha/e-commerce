// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import {Link} from 'react-router-dom'

// const ProductItem = ({id, image, name, price}) => {

//     const {currency,storeUserInteraction}= useContext(ShopContext);

    
//   return (
//     <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`} onClick={() => {
//       console.log("🛒 Product Clicked:", product);
//       storeUserInteraction("view", product?._id);
//     }}
//     >
//      <div className='w-full h-64 overflow-hidden'>
//     <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out' src={image[0] }alt=""/>
//      </div>
//      <p className='pt-3 pb-1 text-sm'>{name}</p>
//      < p className='text-sm font-medium'>{currency}{price}</p>
//     </Link>
//   )
// }

// export default ProductItem

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";



// const ProductItem = ({ id, image, name, price }) => {
//   const { currency, storeUserInteraction } = useContext(ShopContext);

//   return (
//     // <Link
//     //   className="text-gray-700 cursor-pointer"
//     //   to={`/product/${id}`}
//     //   onClick={() => {
//     //     console.log("🛒 Product Clicked:", { id, name, price });
//     //     storeUserInteraction("view", id);
//     //   }}
//     // >
//     <Link
//     className="text-gray-700 cursor-pointer"
//     to={`/product/${id}`}
//     onClick={() => {
//       console.log("🛒 Product Clicked!");
  
//       const product = { 
//         _id: id, 
//         name, 
//         description: description || "No description",  
//         price, 
//         image: image || [],  
//         category: category || "Unknown",  
//         subCategory: subCategory || "Unknown",  
//         bestseller: bestseller || false  
//       };
  
//       console.log("📦 Sending product data:", product);  // ✅ Debugging log
//       storeUserInteraction("view", product);
//     }}
//   >
  

//       <div className="w-full h-64 overflow-hidden">
//         <img
//           className="w-full h-full object-cover hover:scale-110 transition ease-in-out"
//           src={image[0]}
//           alt=""
//         />
//       </div>
//       <p className="pt-3 pb-1 text-sm">{name}</p>
//       <p className="text-sm font-medium">
//         {currency}
//         {price}
//       </p>
//     </Link>
//   );
// };

// export default ProductItem;













// very much fine code
// const ProductItem = ({ id, image, name, price, description, category, subCategory, bestseller }) => {
//   const { currency, storeUserInteraction } = useContext(ShopContext);

//   return (
//     <Link
//       className="text-gray-700 cursor-pointer"
//       to={`/product/${id}`}
//       onClick={() => {
//         console.log("🛒 Product Clicked!");

//         // Prepare the product object with all necessary data
//         const product = { 
//           _id: id, 
//           name, 
//           price, 
//           image,  
//           description,  
//           category,  
//           subCategory,  
//           bestseller 
//         };

//         console.log("📦 Sending product data to database:", product);
        
//         // Store user interaction with full product details
//         storeUserInteraction("view", product);
//       }}
//     >
//       <div className="w-full h-64 overflow-hidden">
//         <img className="w-full h-full object-cover hover:scale-110 transition ease-in-out" src={image[0]} alt={name} />
//       </div>
//       <p className="pt-3 pb-1 text-sm">{name}</p>
//       <p className="text-sm font-medium">{currency}{price}</p>
//     </Link>
//   );
// };

// export default ProductItem;


const ProductItem = ({ id, name, price, image, description, category, subCategory }) => {
  const { storeUserInteraction, currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="border p-4 shadow-sm block hover:shadow-md transition duration-300"
      onClick={async (e) => {
        e.preventDefault(); // Prevent immediate navigation

        console.log("🛒 Related Product Clicked!");

        const newProductData = {
          _id: id,
          name,
          price,
          image,
          description,
          category,
          subCategory,
        };

        console.log("📦 Storing related product interaction:", newProductData);

        await storeUserInteraction("view", newProductData); // Store interaction

        console.log("✅ Interaction stored, now navigating...");

        setTimeout(() => {
          window.location.href = `/product/${id}`;
        }, 500);
      }}
    >
      <img
        src={image && image.length > 0 ? image[0] : "placeholder.jpg"}
        alt={name}
        className="w-full h-60 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
