import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  getUserOrderData,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// 1. Admin Features
// Get all orders route (admin only)
orderRouter.get("/all", adminAuth, getAllOrders);

// Update order status route (admin only)
orderRouter.patch("/:orderId/status", adminAuth, updateOrderStatus);

// 2.payment Features
// Place order route
orderRouter.post("/place", authUser, placeOrder);

// Place order with Stripe route
orderRouter.post("/place/stripe", authUser, placeOrderStripe);

// Place order with Razorpay route
orderRouter.post("/place/razorpay", authUser, placeOrderRazorpay);

// 3. User Features
// Get user orders route
orderRouter.get("/userorders", authUser, getUserOrders);

// Get user order data for frontend
orderRouter.get("/user/data", authUser, getUserOrderData);

export default orderRouter;

/*
1. Which order routes do you actually need?
For your MERN e-commerce project, I would recommend these routes:
HTTP method	Endpoint	Purpose

POST	/api/order/place	   Place a COD order

POST	/api/order/place/stripe	   Place a Stripe order

POST	/api/order/place/razorpay	   Place a Razorpay order

GET	/api/order/userorders	   Get the logged-in user's orders

GET	/api/order/list	Admin    retrieves all orders

PUT	/api/order/status	Admin    updates order status

You don't necessarily need a DELETE order route.

2. Why would you need to update an order?
Even though customers shouldn't freely modify orders, the admin needs to manage their status.

For example, an order might have these statuses:
1. Order placed
   Order Placed
2. Admin confirms and processes the order
   Processing
3. Order is shipped
   Shipped
4. Customer receives the product
   Delivered
Your admin might need to update the order status from Processing to Shipped, for example.

The main concept to remember: An order is a transaction record, not simply another product in your database. You manage its status and lifecycle rather than freely editing or deleting it.
*/
