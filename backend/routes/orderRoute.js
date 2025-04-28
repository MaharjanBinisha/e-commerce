import express from 'express'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders,allOrders,updateStatus, verifyStripe, placeOrderKhalti, verifyKhalti} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import router from './KhaltiRoutes.js'
const orderRouter = express. Router()
router.get('/by-pidx/:pidx', authUser, async (req, res) => {
    try {
      const order = await orderModel.findOne({ pidx });
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/khalti', authUser, placeOrderKhalti);
orderRouter.post('/verifyKhalti', authUser, verifyKhalti);

//user feature
orderRouter.post('/userorders',authUser,userOrders)


//verify payment

orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter
