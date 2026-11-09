import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";

// Placing an order uisng COD mehtod
const placeOrder = async (req, res) => {
  try {
    const { userId } = req;
    // console.log("userId", userId);
    // console.log("req.body", req.body);
    const { items, amount, address, paymentMethod } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount: amount,
      address,
      paymentMethod,
      payment: false, // COD payment is not completed yet
      date: new Date(), // Set the current date
    });

    // Save the order to the database
    await newOrder.save();

    // then delete the cart items for the user
    await User.findByIdAndUpdate(
      userId,
      { cartData: {} },
      { returnDocument: "after" },
    );

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing an order using stipe payment method
const placeOrderStripe = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log(stripe);
    const { userId } = req;
    const { items, amount, address, paymentMethod } = req.body;
    const { origin } = req.headers;

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount: amount,
      address,
      paymentMethod,
      payment: false, // COD payment is not completed yet
      date: new Date(), // Set the current date
    });

    // Save the order to the database
    await newOrder.save();

    // creating the list items for stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
        },
      },
      quantity: item.quantity,
    }));

    // pushing the delivery charges to the line items
    line_items.push({
      price_data: {
        currency: "usd",
        unit_amount: 2 * 100,
        product_data: {
          name: "Delivery Charge",
        },
      },
      quantity: 1,
    });
    console.log(line_items);
    // 6. create a session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    // 7. send the response to the frontend
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing an order using Razorpay payment method
const placeOrderRazorpay = async (req, res) => {
  try {
    // 1. create a razorpay instance
    const razorpayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const { userId } = req;
    const { items, amount, address, paymentMethod } = req.body;

    // 2.Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount: amount,
      address,
      paymentMethod,
      payment: false,
      date: Date.now(),
    });

    // 3.Save the order to the database
    await newOrder.save();

    // 4. create the razorpay option
    const option = {
      amount: amount * 100,
      currency: "USD",
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(option, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    console.log("orders", orders);
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    // console.log("orderId", orderId);
    const { status } = req.body;
    // console.log("status", status);

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { returnDocument: "after" },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({ success: true, message: "Order status updated", updatedOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order data for frontend
const getUserOrderData = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { userId } = req;
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const verifyOrderRazorpay = async (req, res) => {
  try {
    const { userId } = req;
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment fail" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  getUserOrderData,
  verifyOrder,
  verifyOrderRazorpay,
};
