import User from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { itemId, size } = req.body;

    // console.log("userId", userId, "itemId", itemId, "size", size);
    // 1. find the user
    const userData = await User.findById(userId);

    // 2. Then store the cart data in a variable
    let cartData = userData.cartData;

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
    const { userId } = req;
    const { itemId, size, quantity } = req.body;
    // 1. find the user
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Then store the cart data in a variable
    let cartData = userData.cartData;

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
    // console.log("req.body", req.userId);
    const { userId } = req;
    // console.log("userId", userId);

    // 1. find the user
    const userData = await User.findById(userId);
    // console.log("userData", userData);

    // 2. Then store the cart data in a variable
    let cartData = userData.cartData;
    // console.log("cartData", cartData);

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

const deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { itemId, size } = req.params;
    // console.log("userId", userId, "itemId", itemId, "size", size);

    // 1. find the user
    const userData = await User.findById(userId);

    // 2. Then store the cart data in a variable
    let cartData = userData.cartData;

    // 3. delete the item from the cart
    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      // If there are no more sizes for this item, remove the item entirely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    // 4. save to the data base
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { returnDocument: "after" },
    );

    // 5. send response
    res.json({
      success: true,
      message: "Item removed from cart",
      cartData: updatedUser.cartData,
    });

    /*
    1.Frontend sends the DELETE request.
    2.Backend retrieves the user's cart.
    3.Backend deletes the selected product size.
    4.Backend updates MongoDB.
    5.Backend returns the updated cart.
    6.Frontend updates its state with the returned cart.
    */
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getCart, deleteCartItem };
