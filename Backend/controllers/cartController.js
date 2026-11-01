import User from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    // console.log("userId", userId, "itemId", itemId, "size", size);
    // 1. find the user
    const userData = await User.findById(userId);

    // 2. Then store the cart data in a variable
    let cartData = await userData.cartData;

    // 3. check if cart data is avaliable with the item Id.
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    // 4. using the user id , update the cart in the data base
    await User.findByIdAndUpdate(userId, { cartData });
    // 5. generate a response
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update  user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    // 1. find the user
    const userData = await User.findById(userId);

    // 2. Then store the cart data in a variable
    let cartData = await userData.cartData;

    // 3. update the cart
    cartData[itemId][size] = Number(quantity);

    // 4. save to the data base
    await User.findByIdAndUpdate(userId, { cartData });

    // 5. send response
    res.json({ success: true, message: "update is successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// get  user cart
const getCart = async (req, res) => {
  try {
    console.log("req.body", req.userId);
    const { userId } = req.body;
    console.log("userId", userId);

    // 1. find the user
    const userData = await User.findById(userId);

    // 2. Then store the cart data in a variable
    let cartData = await userData.cartData;

    res.json({
      success: true,
      cartData: userData.cartData,
      message: "Here is your cart",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getCart };
