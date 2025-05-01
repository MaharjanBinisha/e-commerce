import express from 'express';
import { loginUser, registerUser, adminLogin, deleteAccount} from '../controllers/userController.js';
import { verifyEmail } from '../controllers/userController.js';
import { verifyUser } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import { requestPasswordReset, resetPassword } from "../controllers/userController.js";
const userRouter= express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/verify', verifyUser);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/request-reset', requestPasswordReset);
userRouter.post('/reset-password', resetPassword);

userRouter.delete('/delete', authUser, deleteAccount);
export default userRouter;