import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const KhaltiSuccess = () => {
  const { backendUrl, token, setCartItems } = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = localStorage.getItem("khalti_pidx")
      if (!pidx) return toast.error("Missing Khalti transaction reference.")

      try {
        const res = await axios.post(`${backendUrl}/api/order/khalti/verify`, { pidx }, {
          headers: { token }
        })

        if (res.data.success) {
          localStorage.removeItem("khalti_pidx")
          setCartItems({})
          toast.success("Payment successful!")
          navigate('/orders')
        } else {
          toast.error(res.data.message)
        }

      } catch (err) {
        console.log(err)
        toast.error("Verification failed.")
      }
    }

    verifyPayment()
  }, [])

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <p className='text-xl'>Verifying payment...</p>
    </div>
  )
}

export default KhaltiSuccess
