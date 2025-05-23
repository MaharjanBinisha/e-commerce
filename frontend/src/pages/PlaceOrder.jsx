import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''

  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token'); // or sessionStorage, depending on how you're storing it

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    };
    // Check if all form fields are filled
    for (const key in formData) {
      if (formData[key].trim() === '') {
        toast.error("All fields must be completely filled.");
        return;
      }
    }

    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)

            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        //api call for cod 
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })


          if (response.data.success) {
            setCartItems({})
            navigate('/orders')

          } else {
            toast.error(response.data.message)
          }
          break;

        //         case 'khalti':
        // try {
        //   const orderData = {
        //     address: formData,
        //     items: orderItems,
        //     amount: getCartAmount() + delivery_fee
        //   };

        //   const response = await axios.post(
        //     `${backendUrl}/api/khalti/init`,
        //     orderData,
        //     { 
        //       headers: { 
        //         token,
        //         'Content-Type': 'application/json'
        //       } 
        //     }
        //   );

        //   if (response.data.success) {
        //     // Save pidx to verify later
        //     localStorage.setItem('khalti_pidx', response.data.pidx);
        //     window.location.href = response.data.payment_url;
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   console.error("Payment Error:", {
        //     message: error.message,
        //     response: error.response?.data,
        //     stack: error.stack
        //   });
        //   toast.error(error.response?.data?.message || "Payment failed");
        // }
        // break;


        // case 'khalti':
        //   try {
        //     const orderData = {
        //       address: formData,
        //       items: orderItems,
        //       amount: getCartAmount() + delivery_fee
        //     };
        //     const token = localStorage.getItem('token');
        //     const response = await axios.post(
        //       `${backendUrl}/api/khalti/init`,
        //       orderData,
        //       {
        //         headers: {
        //           token: token, // Exactly matches your auth middleware expectation
        //         },
        //       }
        //     );

        //     if (response.data.success) {
        //       sessionStorage.setItem('khalti_pidx', response.data.pidx);
        //       window.location.href = response.data.payment_url;
        //     } else {
        //       toast.error(response.data.message);
        //     }
        //   } catch (error) {
        //     console.error("Payment Error:", {
        //       message: error.message,
        //       response: error.response?.data
        //     });
        //     toast.error(error.response?.data?.message || "Payment initiation failed");
        //   }
        //   break;
        case 'khalti':
          try {
            const orderData = {
              address: formData,
              items: orderItems,
              amount: getCartAmount() + delivery_fee,
              // Add any other required fields
            };
            
            const token = localStorage.getItem('token');
            
            // Store the complete order data in sessionStorage
            sessionStorage.setItem('khalti_order_data', JSON.stringify(orderData));
            
            const response = await axios.post(
              `${backendUrl}/api/khalti/init`,
              orderData,
              {
                headers: {
                  token: token,
                },
              }
            );
        
            if (response.data.success) {
              // Store pidx in sessionStorage
              sessionStorage.setItem('khalti_pidx', response.data.pidx);
              
              // Store purchase_order_id if returned
              if (response.data.purchase_order_id) {
                sessionStorage.setItem('purchase_order_id', response.data.purchase_order_id);
              }
              
              // Redirect to payment URL
              window.location.href = response.data.payment_url;
            } else {
              toast.error(response.data.message);
              // Clean up stored data if failed
              sessionStorage.removeItem('khalti_order_data');
              sessionStorage.removeItem('khalti_pidx');
            }
          } catch (error) {
            console.error("Payment Error:", {
              message: error.message,
              response: error.response?.data
            });
            toast.error(error.response?.data?.message || "Payment initiation failed");
            // Clean up stored data on error
            sessionStorage.removeItem('khalti_order_data');
            sessionStorage.removeItem('khalti_pidx');
          }
          break;


        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)


    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 sim-h-[80vh] border-t'>
      {/*left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery Information'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last  Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Contact number' />

      </div>

      {/*right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />
          {/*payment method slsectin */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            {/* <div  onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}
            <div onClick={() => setMethod('khalti')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'khalti' ? 'bg-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.khalti_logo} alt="Khalti" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>cash on delivery</p>
            </div>

          </div>
          <div className='w-full text-end mt-8'>
            <button type="button" onClick={onSubmitHandler} className='bg-black text-white px-16 py-3 text-sm'> Place Order </button>

          </div>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder