// import { useEffect, useContext } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ShopContext } from '../context/ShopContext';

// const KhaltiVerify = () => {
//   const [searchParams] = useSearchParams();
//   const { backendUrl, token } = useContext(ShopContext);
//   const navigate = useNavigate();
//   console.log("Calling:", `${backendUrl}/api/khalti/verify-payment`);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const pidx = searchParams.get('pidx');
//       const status = searchParams.get('status');
      
//       if (!pidx || status !== 'Completed') {
//         toast.error("Payment verification failed - invalid parameters");
//         navigate('/orders');
//         return;
//       }

//       try {
//         const response = await axios.post(`${backendUrl}/api/khalti/verify-payment`, { pidx }, {
//             headers: {
//               'Content-Type': 'application/json',
//               'token': token
//             }
//           });
          
          

//         if (response.data.success) {
//           toast.success("Payment verified successfully!");
//         } else {
//           toast.error(response.data.message || "Payment verification failed");
//         }
//       } catch (error) {
//         console.error("Verification Error:", {
//           message: error.message,
//           response: error.response?.data
//         });
//         toast.error("Payment completed - verification pending");
//       }
      
//       navigate('/orders');
//     };

//     verifyPayment();
//   }, [searchParams, navigate, backendUrl, token]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
//         <p>Please wait while we confirm your transaction.</p>
//       </div>
//     </div>
//   );
// };

// export default KhaltiVerify;





// import { useEffect, useContext } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ShopContext } from '../context/ShopContext';

// const KhaltiVerify = () => {
//   const [searchParams] = useSearchParams();
//   const { backendUrl, token } = useContext(ShopContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const pidx = searchParams.get('pidx');
//       const status = searchParams.get('status');

//       // 🟥 Redirect to /cart if payment was cancelled or not completed
//       if (!pidx || status !== 'Completed') {
//         toast.error("Payment was cancelled or not completed.");
//         navigate('/cart');
//         return;
//       }

//       try {
//         const response = await axios.post(
//           `${backendUrl}/api/khalti/verify-payment`,
//           { pidx },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'token': token
//             }
//           }
//         );

//         if (response.data.success) {
//           toast.success("Payment verified successfully!");
//           navigate('/orders');
//         } else {
//           toast.error(response.data.message || "Payment verification failed");
//           navigate('/cart');
//         }
//       } catch (error) {
//         console.error("Verification Error:", {
//           message: error.message,
//           response: error.response?.data
//         });
//         toast.error("Something went wrong during verification.");
//         navigate('/cart');
//       }
//     };

//     verifyPayment();
//   }, [searchParams, navigate, backendUrl, token]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
//         <p>Please wait while we confirm your transaction.</p>
//       </div>
//     </div>
//   );
// };

// export default KhaltiVerify;
import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

// const KhaltiVerify = () => {
//   const [searchParams] = useSearchParams();
//   const { backendUrl, token } = useContext(ShopContext);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const verifyPayment = async () => {
//       const pidx = searchParams.get('pidx');
//       const status = searchParams.get('status');

//       if (!pidx || status !== 'Completed') {
//         toast.error("Payment was cancelled or not completed.");
//         navigate('/cart');
//         return;
//       }

//       try {
//         // const response = await axios.post(
//         //   'http://localhost:4000/api/khalti/verify-payment',
//         //   { pidx },
//         //   {
//         //     headers: {
//         //       'Content-Type': 'application/json',
//         //       'token': localStorage.getItem('token'), // ✅ correct
//         //     }
//         //   }
//         // );
//         const response = await axios.post(
//           'http://localhost:4000/api/khalti/verify-payment',
//           {
//             pidx,
//             address: JSON.parse(localStorage.getItem('address')),
//             items: JSON.parse(localStorage.getItem('items')),
//             amount: localStorage.getItem('amount'),
//             purchase_order_id: localStorage.getItem('purchase_order_id'),
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'token': localStorage.getItem('token'),
//             }
//           }
//         );
        
//         if (response.data.success) {
//           toast.success("Payment verified successfully!");
//           navigate('/orders');
//         } else {
//           toast.error(response.data.message || "Payment verification failed");
//           navigate('/cart');
//         }
//       } catch (error) {
//         console.error("Verification Error:", {
//           message: error.message,
//           response: error.response?.data
//         });
//         toast.error("Something went wrong during verification.");
//         navigate('/cart');
//       }
      
//     };

//     verifyPayment();
//   }, [searchParams, navigate, backendUrl, token]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
//         <p>Please wait while we confirm your transaction.</p>
//       </div>
//     </div>
//   );
// };
const KhaltiVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = searchParams.get('pidx');
      const status = searchParams.get('status');

      if (!pidx || status !== 'Completed') {
        toast.error("Payment was cancelled or not completed.");
        navigate('/cart');
        return;
      }

      try {
        // Retrieve stored data
        const storedData = sessionStorage.getItem('khalti_order_data');
        if (!storedData) {
          throw new Error("Order data not found. Please place your order again.");
        }

        const orderData = JSON.parse(storedData);
        const token = localStorage.getItem('token');

        const response = await axios.post(
          `${backendUrl}/api/khalti/verify-payment`,
          {
            pidx,
            ...orderData,
            purchase_order_id: sessionStorage.getItem('purchase_order_id') || Date.now().toString()
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'token': token,
            }
          }
        );
        
        if (response.data.success) {
          toast.success("Payment verified successfully!");
          
          // Clear stored payment data
          sessionStorage.removeItem('khalti_order_data');
          sessionStorage.removeItem('khalti_pidx');
          sessionStorage.removeItem('purchase_order_id');
          
          navigate('/orders');
        } else {
          toast.error(response.data.message || "Payment verification failed");
          navigate('/cart');
        }
      } catch (error) {
        console.error("Verification Error:", {
          message: error.message,
          response: error.response?.data
        });
        toast.error(error.message || "Something went wrong during verification.");
        navigate('/cart');
      }
    };

    verifyPayment();
  }, [searchParams, navigate, backendUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
        <p>Please wait while we confirm your transaction.</p>
      </div>
    </div>
  );
};
export default KhaltiVerify;
