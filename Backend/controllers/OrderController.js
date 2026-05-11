import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
   process.env.STRIPE_SECRET_KEY
);

//Placing orders using COD method

const placeOrder = async (req, res) => {

   try {

      const { userId, items, amount, address } = req.body;

      const orderData = {
         userId,
         items,
         amount,
         address,
         paymentMethod: "COD",
         payment: false,
         date: Date.now()
      }

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      await userModel.findByIdAndUpdate(userId, {
         cartData: []
      });

      return res.json({ success: true, message: "Order Placed" });

   } catch (error) {
      return res.json({ success: false, message: error.message });
   }

}

//Placing orders using Razorpay Method

const placeOrderRazorpay = async (req, res) => {

}



//Placing orders using Stripe Method

const placeOrderStripe = async (req, res) => {

   try {
      const { userId, items, amount, address } = req.body;


      const orderData = {
         userId,
         items,
         amount,
         address,
         paymentMethod: "Stripe",
         payment: false,
         date: Date.now()
      }

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      const orderId = newOrder._id;

      const listitems = items.map(item => ({

         price_data: {

            currency: "usd",

            product_data: {
               name: item.name,
               images: [item.image?.[0]]
            },

            unit_amount: Math.round(item.price * 100)
         },

         quantity: item.quantity

      }));

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: listitems,
         mode: 'payment',
         success_url: `${process.env.Frontend_Url}/successStripe?orderId=${orderId}`,
         cancel_url: `${process.env.Frontend_Url}/cancelStripe`
      });



      return res.json({ success: true, url: session.url });
   } catch (error) {
      return res.json({ success: false, message: error.message });
   }
}

//all orders data for admin panel

const allOrders = async (req, res) => {

   try {
      const orders = await orderModel.find({});
      return res.json({ success: true, orders });
   } catch (error) {
      return res.json({ success: false, message: error.message });
   }

}

//User order Data for Frontend

const UserOrders = async (req, res) => {

   try {

      const { userId } = req.body;

      const user = await orderModel.find({ userId });



      return res.json({ success: true, orderData: user });

   } catch (error) {

      return res.json({ success: false, message: error.message });

   }

}

//Placing orders using Razorpay Method

const updateStatus = async (req, res) => {

   try {

      const { userId, value } = req.body;


      await orderModel.findByIdAndUpdate({ _id: userId }, {
         status: value
      })



      if (value == "Delivered") {
         await orderModel.findByIdAndUpdate({ _id: userId }, {
            payment: true
         })
      }

      return res.json({ success: true, message: "Status Updated" });

   } catch (error) {

      return res.json({ success: true, message: error.message });

   }
}

const verifyPayment = async (req, res) => {

   try {

      const { orderId, success } = req.body;

      if (success) {

         const user = await orderModel.findByIdAndUpdate({
            _id: orderId,
         }, {
            payment: true
         });

         const userId = user.userId;

         await userModel.findByIdAndUpdate({
            _id: userId,
         }, {
            cart: []
         });

         return res.json({ success: true, message: "Payment Received Successfully" });

      } else {
         return res.json({ success: false, message: "Payment Failed" });
      }

   } catch (error) {
      return res.json({ success: false, message: error.message });
   }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, UserOrders, updateStatus, verifyPayment }

