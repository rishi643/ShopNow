import express from 'express'
import { placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, UserOrders, placeOrder, verifyPayment} from '../controllers/OrderController.js'
import adminAuth from '../middleware/adminAuth.js'
import { authUser } from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin features

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

//Payment features

orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/stripe', authUser, placeOrderStripe);

//User Feature

orderRouter.post('/userorders', authUser, UserOrders);

orderRouter.post('/verify', verifyPayment);

export default orderRouter;

