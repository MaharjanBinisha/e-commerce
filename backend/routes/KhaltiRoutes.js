// import express from 'express';
// import { initKhaltiPayment, verifyKhaltiPayment } from '../controllers/khaltiController.js';
// import authUser from '../middleware/auth.js'

// const router = express.Router();


// // Khalti Routes (khaltiRoutes.js)
// router.post('/init', authUser, initKhaltiPayment); // authUser must come first
// // router.post('/verify-payment', authUser, verifyKhaltiPayment);
// router.post('/verify-payment', verifyKhaltiPayment);

// router.get('/test', (req, res) => {
//     res.send("Khalti routes working");
//   });
  

  
// console.log("Khalti routes loaded");
// export default router;
import express from 'express';
import { initKhaltiPayment, verifyKhaltiPayment } from '../controllers/khaltiController.js';
import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/init', authUser, initKhaltiPayment);
router.post('/verify-payment', authUser, verifyKhaltiPayment); // Keep this one only

router.get('/test', (req, res) => {
  res.send("Khalti routes working");
});

console.log("Khalti routes loaded");
export default router;

