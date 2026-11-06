import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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
    const { userId } = req;
    const { items, totalAmount, address, paymentMethod, payment } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod,
      payment,
    });

    // Save the order to the database
    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing an order using Razorpay payment method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId } = req;
    const { items, totalAmount, address, paymentMethod, payment } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod,
      payment,
    });

    // Save the order to the database
    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully" });
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
    const { status } = req.body;

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
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

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  getUserOrderData,
};
