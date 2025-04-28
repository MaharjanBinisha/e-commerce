import axios from 'axios';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
// INITIATE KHALTI PAYMENT
// const initKhaltiPayment = async (req, res) => {
//     try {
//       const { items, amount, address } = req.body;
      
//       // Generate unique order ID
//       const purchase_order_id = `order_${Date.now()}`;
      
//       const customer_info = {
//         name: `${address.firstName} ${address.lastName}`,
//         email: address.email,
//         phone: address.phone
//       };
  
//       const payload = {
//         return_url: `${process.env.FRONTEND_URL}/khalti-verify`,
//         website_url: process.env.FRONTEND_URL,
//         amount: Math.round(amount * 100), // Convert to paisa
//         purchase_order_id,
//         purchase_order_name: `Order ${purchase_order_id}`,
//         customer_info
//       };
  
//       console.log("Sending to Khalti:", payload); // Debug log
  
//       const response = await axios.post(
//         "https://a.khalti.com/api/v2/epayment/initiate/",
//         payload,
//         {
//           headers: {
//             Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
  
//       res.json({ 
//         success: true, 
//         payment_url: response.data.payment_url,
//         pidx: response.data.pidx
//       });
  
//     } catch (error) {
//       console.error("Full Error:", error);
//       console.error("Khalti API Response:", error.response?.data);
      
//       res.status(500).json({
//         success: false,
//         message: "Payment initiation failed",
//         error: error.message,
//         khaltiError: error.response?.data
//       });
//     }
//   };


//very much working code
// const initKhaltiPayment = async (req, res) => {
//     try {
//       const userId = req.body.userId;
      
//       if (!userId) {
//         return res.status(401).json({
//           success: false,
//           message: 'User ID not found'
//         });
//       }
  
//       const { items, amount, address } = req.body;
  
//       // Generate unique IDs
//       const purchase_order_id = `order_${Date.now()}`;
//       const customer_info = {
//         name: `${address.firstName} ${address.lastName}`,
//         email: address.email,
//         phone: address.phone
//       };
  
//       // Create payload for Khalti
//       const payload = {
//         return_url: `${process.env.FRONTEND_URL}/khalti-verify`,
//         website_url: process.env.FRONTEND_URL,
//         amount: Math.round(amount * 100), // Convert to paisa
//         purchase_order_id,
//         purchase_order_name: `Order ${purchase_order_id}`,
//         customer_info
//       };
  
//       console.log("Sending to Khalti:", payload);
  
//       // Initiate payment with Khalti
//       const khaltiResponse = await axios.post(
//         "https://a.khalti.com/api/v2/epayment/initiate/",
//         payload,
//         {
//           headers: {
//             Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
  
//       // Create order in database with all required fields
//       const orderData = {
//         userId: userId,
//         items,
//         address,
//         amount,
//         paymentMethod: "Khalti",
//         payment: false,
//         status: "Pending",
//         pidx: khaltiResponse.data.pidx,
//         purchase_order_id,
//         date: new Date() // Add the required date field
//       };
  
//       const newOrder = new orderModel(orderData);
//       await newOrder.save();
  
//       res.json({
//         success: true,
//         payment_url: khaltiResponse.data.payment_url,
//         pidx: khaltiResponse.data.pidx
//       });
  
//     } catch (error) {
//       console.error("Initiation Error:", {
//         message: error.message,
//         stack: error.stack
//       });
      
//       res.status(500).json({
//         success: false,
//         message: 'Payment initiation failed',
//         error: error.message
//       });
//     }
//   };
///////////////////
const initKhaltiPayment = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID not found'
      });
    }

    const { items, amount, address } = req.body;

    const purchase_order_id = `order_${Date.now()}`;
    const customer_info = {
      name: `${address.firstName} ${address.lastName}`,
      email: address.email,
      phone: address.phone
    };

    const payload = {
      return_url: `${process.env.FRONTEND_URL}/khalti-verify`,
      website_url: process.env.FRONTEND_URL,
      amount: Math.round(amount * 100),
      purchase_order_id,
      purchase_order_name: `Order ${purchase_order_id}`,
      customer_info
    };

    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Don't save order yet — wait for successful payment

    res.json({
      success: true,
      payment_url: khaltiResponse.data.payment_url,
      pidx: khaltiResponse.data.pidx,
      purchase_order_id,
      address,
      items,
      amount,
    });

  } catch (error) {
    console.error("Initiation Error:", {
      message: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: error.message
    });
  }
};


// VERIFY KHALTI PAYMENT
//  const verifyKhaltiPayment = async (req, res) => {
//     const { pidx } = req.body;
//     const userId = req.body.userId;
  
//     if (!pidx) {
//       return res.status(400).json({ success: false, message: "Missing pidx" });
//     }
  
//     try {
//       const response = await axios.post(
//         'https://a.khalti.com/api/v2/payment/verify/',
//         { pidx },
//         {
//           headers: {
//             Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//           },
//         }
//       );
  
//       const data = response.data;
  
//       if (data.status === 'Completed') {
//         // Optional: Create or update order here based on userId
//         // Example:
//         const newOrder = new Order({
//           user: userId,
//           paymentInfo: {
//             method: 'Khalti',
//             transactionId: pidx,
//             status: 'Paid',
//           },
//           // Add other fields like products, total price, etc., as needed
//         });
  
//         await newOrder.save();
  
//         res.status(200).json({
//           success: true,
//           message: 'Payment verified and order created',
//           order: newOrder,
//         });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: 'Payment not completed',
//           data,
//         });
//       }
//     } catch (error) {
//       console.error('Khalti verification error:', error.response?.data || error.message);
//       res.status(500).json({
//         success: false,
//         message: 'Payment verification failed',
//         error: error.response?.data || error.message,
//       });
//     }
//   };



// const verifyKhaltiPayment = async (req, res) => {
//   try {
//     const { pidx } = req.body;

//     if (!pidx) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment ID (pidx) is required'
//       });
//     }

//     // Verify with Khalti API - include Authorization header
//     // const khaltiResponse = await axios.post(
//     //   "https://a.khalti.com/api/v2/epayment/lookup/",
//     //   { pidx }, // Only pidx needed in body
//     //   {
//     //     headers: {
          
//     //       "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//     //       "Content-Type": "application/json"
//     //     }
//     //   }
//     // );
//     const khaltiResponse = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       {
//         headers: {
//           token: req.headers['token'] || req.headers['authorization'], // ✅ token from request headers
//           "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );
    
//     console.log("Khalti Verification Response:", khaltiResponse.data);

//     if (khaltiResponse.data.status !== 'Completed') {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Payment not completed' 
//       });
//     }
// const allOrders = await orderModel.find();
// console.log("🧾 All Orders in DB:", allOrders);

// console.log("🔍 Looking for order with pidx:", pidx);

//     // Update order status
//     const updatedOrder = await orderModel.findOneAndUpdate(
//       { pidx },
//       { 
//         $set: { 
//           payment: true,
//           status: 'Paid',
//           paymentDetails: khaltiResponse.data,
//           completedAt: new Date()
//         } 
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     res.json({ 
//       success: true,
//       message: 'Payment verified successfully'
//     });

//   } catch (error) {
//     console.error("Verification Error:", {
//       message: error.message,
//       response: error.response?.data,
//       stack: error.stack
//     });
    
//     res.status(500).json({
//       success: false,
//       message: 'Payment verification failed',
//       error: error.message,
//       khaltiError: error.response?.data
//     });
//   }
// };




//working for now code

// const verifyKhaltiPayment = async (req, res) => {
//   try {
//     const { pidx, userId } = req.body;

//     if (!pidx) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment ID (pidx) is required'
//       });
//     }

//     // 1. Call Khalti's API to verify the payment
//     const khaltiResponse = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       {
//         headers: {
//           "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("✅ Khalti Verification Response:", khaltiResponse.data);

//     // 2. Check if payment is completed
//     if (khaltiResponse.data.status !== 'Completed') {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment not completed'
//       });
//     }

//     // 3. Update order based on pidx
//     const updatedOrder = await orderModel.findOneAndUpdate(
//       { pidx, userId },
//       {
//         $set: {
//           payment: true,
//           status: 'Paid',
//           paymentDetails: khaltiResponse.data,
//           completedAt: new Date()
//         }
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found for provided pidx'
//       });
//     }

//     // 4. Clear the user's cart
//     if (userId) {
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//     }

//     // 5. Respond success
//     return res.json({
//       success: true,
//       message: 'Payment verified successfully',
//       order: updatedOrder
//     });

//   } catch (error) {
//     console.error("❌ Khalti Verification Error:", {
//       message: error.message,
//       response: error.response?.data,
//       stack: error.stack
//     });

//     return res.status(500).json({
//       success: false,
//       message: 'Payment verification failed',
//       error: error.message,
//       khaltiError: error.response?.data
//     });
//   }
// };


//very much working code
// const verifyKhaltiPayment = async (req, res) => {
//   try {
//     const { pidx } = req.body;
//     const userId = req.body.userId;


//     if (!pidx) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment ID (pidx) is required'
//       });
//     }

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: Please login to verify payment'
//       });
//     }

//     const khaltiResponse = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       {
//         headers: {
//           "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     if (khaltiResponse.data.status !== 'Completed') {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment not completed'
//       });
//     }

//     const updatedOrder = await orderModel.findOneAndUpdate(
//       { pidx, userId },
//       {
//         $set: {
//           payment: true,
//           status: 'Paid',
//           paymentDetails: khaltiResponse.data,
//           completedAt: new Date()
//         }
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found for provided pidx and user'
//       });
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     return res.json({
//       success: true,
//       message: 'Payment verified successfully',
//       order: updatedOrder
//     });

//   } catch (error) {
//     console.error("❌ Khalti Verification Error:", {
//       message: error.message,
//       response: error.response?.data,
//       stack: error.stack
//     });

//     return res.status(500).json({
//       success: false,
//       message: 'Payment verification failed',
//       error: error.message,
//       khaltiError: error.response?.data
//     });
//   }
// };
///////////////
const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx, address, items, amount, purchase_order_id } = req.body;
    const userId = req.body.userId;

    if (!pidx || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing pidx or user ID'
      });
    }

    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (khaltiResponse.data.status !== 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    // Save order only after completed payment
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Khalti",
      payment: true,
      status: "Paid",
      pidx,
      purchase_order_id,
      date: new Date(),
      paymentDetails: khaltiResponse.data,
      completedAt: new Date()
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({
      success: true,
      message: 'Payment verified and order placed successfully',
      order: newOrder
    });

  } catch (error) {
    console.error("❌ Khalti Verification Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
      khaltiError: error.response?.data
    });
  }
};


export { initKhaltiPayment, verifyKhaltiPayment };
