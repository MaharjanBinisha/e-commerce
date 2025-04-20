// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const List = ({token}) => {

// const [list, setList] = useState([])

// const fetchList = async ()=>{
// try {
//   const response = await axios.get(backendUrl + '/api/product/list')
//   if (response.data.success) {
//     setList(response.data.products);
//   }
//   else{
//     toast.error(response.data.message)
//   }

// } catch (error) {
//   console.log(error);
//   toast.error(error.message)
  
// }
// }

// const removeProduct = async (id)=>{
//   try {
    
//     const response = await axios.post(backendUrl + '/api/product/remove',{id}, {headers:{token}})


//     if (response.data.success) {
//       toast.success(response.data.message)
//       await fetchList();
//     }else{
//       toast.error(response.data.message)
//     }

//   } catch (error) {
//     console.log(error);
//   toast.error(error.message)
//   }

// }

// useEffect(()=>{
// fetchList()
// },[])

//   return (
//     <>
//        <p className='mb-2'>Products list</p>
//        <div className='flex flex-col gap-2'>

//          {/* list table title*/}

//          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-right pr-1'>Action</b>
//          </div>

//         {/*product list */}

//         {
//           list.map((item,index)=>(

//             // <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}> 
//             //         <img className='w-12' src={item.image[0]} alt=""/>
//             //         <p>{item.name}</p>
//             //         <p>{item.category}</p>
//             //         <p>{currency}{item.price}</p>
//             //         <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X </p>
                    
//             //         <div><img className=' gap-2 w-10 cursor-pointer' src={assets.edit} alt="" /></div>
//             // </div>
// <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm pr-4' key={index}> 
//     <img className='w-12' src={item.image[0]} alt=""/>
//     <p>{item.name}</p>
//     <p>{item.category}</p>
//     <p>{currency}{item.price}</p>

//     {/* New Flexbox Wrapper for Edit & Delete Icons */}
//     <div className="flex items-center gap-2 justify-end">
//         <img className='w-6 cursor-pointer' src={assets.edit} alt="Edit" />
//         <p onClick={()=>removeProduct(item._id)} className='cursor-pointer text-lg'>X</p>
//     </div>
// </div>

            

//           ))
//         }
   

//         </div> 
//     </>
//   )
// }

// export default List

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { backendUrl, currency } from '../App';
import Add from './Add';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Stores product being edited

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  useEffect(() => {
    console.log("Edit Product Updated:", editProduct);
  }, [editProduct]);

  const handleEdit = (product) => {
    console.log("Editing Product:", product);
    setEditProduct(product);
  };
  
  
  

  return (
    <>
    <p className='mb-2'>Products list</p>
  
    <div className='flex flex-col gap-2'>
      {/* Header */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Quantity</b>
        <b className='text-right pr-1'>Action</b>
      </div>
  
      {/* List Items */}
      {list.map((item, index) => (
        <div
          className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm pr-4'
          key={index}
        >
          <img className='w-12' src={item.image[0]} alt='' />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>
            {currency}
            {item.price}
          </p>
          <p>{item.quantity}</p>
  
          {/* Action Buttons */}
          <div className='flex items-center gap-2 justify-end'>
            <img
              className='w-6 cursor-pointer'
              src={assets.edit}
              alt='Edit'
              onClick={() => {
                console.log("Editing Product:", item._id);
                setEditProduct(item);
              }}
            />
            <p
              onClick={() => removeProduct(item._id)}
              className='cursor-pointer text-lg'
            >
              X
            </p>
          </div>
        </div>
      ))}
    </div>
  
    {/* Edit Form Modal */}
    {editProduct && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[600px]"> */}
        <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6">
          <Add
            token={token}
            product={editProduct}
            setEditProduct={setEditProduct}
          />
          <button onClick={() => setEditProduct(null)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    )}
  </>
  
  );
};

export default List;
