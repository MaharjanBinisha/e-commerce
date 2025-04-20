// import React, { useState } from 'react'
// import {assets} from '../assets/assets'
// import axios from 'axios'
// import {backendUrl} from '../App'
// import { toast } from 'react-toastify'

// const Add = ({token}) => {


//   const [image1, setImage1]= useState(false)
//   const [image2, setImage2]= useState(false)
//   const [image3, setImage3]= useState(false)
//   const [image4, setImage4]= useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice]=useState("");
//   const [category, setCategory]= useState("Men");
//   const [subCategory, setSubCategory]=useState("Topwear");
//   const [bestseller, setBestSeller]=useState(false);
//   const [sizes, setSizes]= useState([]);

//   const onSubmitHandler= async (e)=>{
// e.preventDefault();

//   // Check if at least one image is uploaded
//   const isAnyImageUploaded = image1 || image2 || image3 || image4;

//   // Validation check
//   if (
//     !name.trim() || 
//     !description.trim() || 
//     !price || 
//     !category || 
//     !subCategory || 
//     sizes.length === 0 || 
//     !isAnyImageUploaded  // Ensure at least one image is uploaded
//   ) {
//     toast.error("All fields should be filled, and at least one image must be uploaded.");
//     return;
//   }

// try {
//   const formData = new FormData()
//   formData.append("name",name)
//   formData.append("description",description)
//   formData.append("price",price)
//   formData.append("category",category)
//   formData.append("subCategory",subCategory)
//   formData.append("bestseller",bestseller)
//   formData.append("sizes",JSON.stringify(sizes))

//   image1 && formData.append("image1",image1)
//   image1 && formData.append("image2",image2)
//   image1 && formData.append("image3",image3)
//   image1 && formData.append("image4",image4)


//  const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

//  if (response.data.success) {
//   toast.success(response.data.message)
//   setName('')
//   setDescription('')
//   setImage1(false)
//   setImage2(false)
//   setImage3(false)
//   setImage4(false)
//   setPrice('')

//  }else{
//   toast.error(response.data.message)
//  }


// } catch (error) {
//   console.log(error);
//   toast.error(error.message)
// }
//   }

//   return (
//     <form onSubmit={onSubmitHandler}className='flex flex-col w-full items-start gap-3'>
//   <div>
//     <p className='mb-2'>
//       Upload image
//     </p>
//     <div className='flex gap-2'>
//       <label htmlFor="image1">
//         <img className='w-20' src={!image1 ?assets.upload_area : URL.createObjectURL(image1)} alt="" />
//         <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
//       </label>
//       <label htmlFor="image2">
//         <img className='w-20' src={!image2 ?assets.upload_area : URL.createObjectURL(image2)} alt="" />
//         <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
//       </label>
//       <label htmlFor="image3">
//         <img className='w-20' src= {!image3 ?assets.upload_area : URL.createObjectURL(image3)} alt="" />
//         <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
//       </label>
//       <label htmlFor="image4">
//         <img className='w-20' src={!image4 ?assets.upload_area : URL.createObjectURL(image4)} alt="" />
//         <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
//       </label>
//     </div>
//   </div>

//   <div className='w-full'>
//     <p className='mb-2'>product name</p>
//     <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//   </div>
//   <div className='w-full'>
//     <p className='mb-2'>Description</p>
//     <textarea  onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type description here' required />
//   </div>

// <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//   <div>
//     <p className='mb-2'>Product category</p>
//     <select  onChange={(e)=>setCategory(e.target.value)}  className='w-full px-3 py-2'>
//       <option value="Men">Men</option>
//       <option value="Women">Women</option>
//       <option value="Kids">Kids</option>
//       <option vlaue="Unisex">Unisex</option>
//     </select>
//   </div>

//   <div>
//     <p className='mb-2'>Product sub-category</p>
//     <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
//       <option value="Topwear">Topwear</option>
//       <option value="Bottomwear">Bottomwear</option>
//       <option value="Winterwear">Winterwear</option>
//       <option value="Formal">Formal</option>
//       <option value="Casual">Casual</option>
//       <option value="Longuewear">Longuewear</option>
//       <option value="Traditional Attire">Traditional Attire</option>
//     </select>
//   </div>

//   <div>
// <p className='mb-2'>Product price</p>
// <input onChange={(e)=> setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='2555'  />

//   </div>
// </div>

// <div>
//   <p className='mb-2'>Product size</p>
//   <div className='flex gap-3'>
//     <div onClick={()=> setSizes(prev => prev.includes("S")? prev.filter(item => item !== "S" ): [...prev,"S"])}>
//       <p className= {` ${sizes.includes("S") ? " bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
//     </div>

//     <div onClick={()=> setSizes(prev => prev.includes("M")? prev.filter(item => item !== "M" ): [...prev,"M"])}>
//       <p className={` ${sizes.includes("M") ? " bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
//     </div>

//     <div onClick={()=> setSizes(prev => prev.includes("L")? prev.filter(item => item !== "L" ): [...prev,"L"])}>
//       <p className={` ${sizes.includes("L") ? " bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
//     </div>

//     <div onClick={()=> setSizes(prev => prev.includes("XL")? prev.filter(item => item !== "XL" ): [...prev,"XL"])}>
//       <p className={` ${sizes.includes("XL") ? " bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
//     </div>

//     <div onClick={()=> setSizes(prev => prev.includes("XXL")? prev.filter(item => item !== "XXL" ): [...prev,"XXL"])}>
//       <p className={` ${sizes.includes("XXL") ? " bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXl</p>
//     </div>
//   </div>
// </div>

// <div className='flex gap-2 mt-2'>
//   <input onChange={()=> setBestSeller (prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//   <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
// </div>

// <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>Add</button>

//     </form>
//   )
// }

// export default Add


import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token, product }) => {
  // State initialization
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    quantity: product?.quantity || 1,
    category: product?.category || "Men",
    subCategory: product?.subCategory || "Topwear",
    bestseller: product?.bestseller || false,
    sizes: product?.sizes || [],
    images: {
      image1: product?.image?.[0] || false,
      image2: product?.image?.[1] || false,
      image3: product?.image?.[2] || false,
      image4: product?.image?.[3] || false
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(product);

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || 1,
        category: product.category || "Men",
        subCategory: product.subCategory || "Topwear",
        bestseller: product.bestseller || false,
        sizes: product.sizes || [],
        images: {
          image1: product.image?.[0] || false,
          image2: product.image?.[1] || false,
          image3: product.image?.[2] || false,
          image4: product.image?.[3] || false
        }
      });
    }
  }, [product]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle size selection
  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(item => item !== size)
        : [...prev.sizes, size]
    }));
  };

  // Handle image changes
  const handleImageChange = (index, file) => {
    const imageKey = `image${index + 1}`;
    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [imageKey]: file
      }
    }));
  };

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      const hasExistingImages = product?.image?.some(img => img);
      const hasNewImages = Object.values(formData.images).some(img => img);
      
      if (!hasExistingImages && !hasNewImages) {
        toast.error("At least one image is required.");
        return;
      }

      if (
        !formData.name.trim() ||
        !formData.description.trim() ||
        !formData.price ||
        // !formData.quantity ||
        formData.quantity === '' || formData.quantity === null ||
        !formData.category ||
        !formData.subCategory ||
        formData.sizes.length === 0
      ) {
        toast.error("All fields are required");
        return;
      }

      // Prepare form data
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("bestseller", formData.bestseller);
      data.append("quantity", formData.quantity);
      
      // Clean sizes array before sending
      const cleanedSizes = formData.sizes.map(size => size.replace(/"/g, ''));
      data.append("sizes", JSON.stringify(cleanedSizes));
      

      // Handle image uploads
      Object.entries(formData.images).forEach(([key, value]) => {
        if (value && value !== product?.image?.[parseInt(key.replace('image', '')) - 1]) {
          data.append(key, value);
        }
      });

      // API call
      const url = isEditMode 
        ? `${backendUrl}/api/product/update/${product._id}`
        : `${backendUrl}/api/product/add`;

      const method = isEditMode ? "put" : "post";

      const response = await axios({
        method,
        url,
        data,
        headers: {
          token
          // "Content-Type": "multipart/form-data",
        },
      });

      
  
        // In your onSubmitHandler, modify the success block:
if (response.data.success) {
  toast.success(isEditMode ? "Product updated successfully" : "Product added successfully");
  
  // Reset form for both add and edit modes
  setFormData({
    name: "",
    description: "",
    price: "",
    quantity: "", 
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
    images: {
      image1: false,
      image2: false,
      image3: false,
      image4: false
    }
  });
}
      
    } catch (error) {
      console.error("❌ Error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Image Upload Section */}
      <div>
        <p className='mb-2'>Upload image</p>
        <div className='flex gap-2'>
          {[1, 2, 3, 4].map((index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                className='w-20'
                src={
                  typeof formData.images[`image${index}`] === "string"
                    ? formData.images[`image${index}`]
                    : formData.images[`image${index}`]
                    ? URL.createObjectURL(formData.images[`image${index}`])
                    : assets.upload_area
                }
                alt=""
              />
              <input 
                onChange={(e) => handleImageChange(index - 1, e.target.files[0])} 
                type="file" 
                id={`image${index}`} 
                hidden 
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input 
          name="name"
          onChange={handleInputChange} 
          value={formData.name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text" 
          required 
        />
      </div>
      
      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Description</p>
        <textarea 
          name="description"
          onChange={handleInputChange} 
          value={formData.description} 
          className='w-full max-w-[500px] px-3 py-2' 
          required 
        />
      </div>

      {/* Category, Subcategory, and Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-1'>Product category</p>
          <select 
            name="category"
            onChange={handleInputChange} 
            value={formData.category} 
            className='w-full px-3 py-2'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Product sub-category</p>
          <select 
            name="subCategory"
            onChange={handleInputChange} 
            value={formData.subCategory} 
            className='w-full px-3 py-2'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Loungewear">Loungewear</option>
            <option value="Traditional Attire">Traditional Attire</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Product price</p>
          <input 
            name="price"
            onChange={handleInputChange} 
            value={formData.price} 
            className='w-full px-3 py-2 sm:w-[120px]' 
            type="number" 
            placeholder='2555' 
            min="0"
          />
        </div>
      </div>
      <div>
  <p className='mb-1'>Product quantity</p>
  <input
  type="number"
  name="quantity"
  min="0"
  className='w-full px-3 py-2 sm:w-[120px]' 
  value={formData.quantity}
  onChange={(e) =>
    setFormData({ ...formData, quantity: Number(e.target.value) })
  }
/>



</div>
      {/* Size Selection */}
      <div>
        <p className='mb-1'>Product size</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => handleSizeToggle(size)}>
              <p className={`${formData.sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-1 mt-1'>
        <input 
          type="checkbox" 
          id='bestseller' 
          checked={formData.bestseller}
          onChange={() => setFormData(prev => ({
            ...prev,
            bestseller: !prev.bestseller
          }))}
        />
        <label className='cursor-pointer' htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit" 
        className='w-28 py-3 mt-1 bg-black text-white'
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : (isEditMode ? "Update" : "Add")}
      </button>
    </form>
  );
};

export default Add;