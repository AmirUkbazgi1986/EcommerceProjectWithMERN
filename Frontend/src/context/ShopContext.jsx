import { createContext, useContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  // the cartItems will be an object with the following structure:
  // {
  //   productId: {
  //     size: quantity
  //   }
  // }
  const navigate = useNavigate();

  const currency = "$";
  const delivery_fee = 10;

  const addToCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    // Check if the item already exists in the cart
    if (cartData[itemId]) {
      // If the item exists, check if the size already exists
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    delete cartData[itemId][size];
    // check if the item has no more sizes left, and if so, remove the item from the cart
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
  };
  // const removeFromCart = (itemId, size) => {
  //   let cartData = structuredClone(cartItems);
  //   if (cartData[itemId] && cartData[itemId][size]) {
  //     cartData[itemId][size] -= 1;
  //     if (cartData[itemId][size] <= 0) {
  //       delete cartData[itemId][size];
  //       if (Object.keys(cartData[itemId]).length === 0) {
  //         delete cartData[itemId];
  //       }
  //     }
  //     setCartItems(cartData);
  //   }
  // };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalItems += Number(cartItems[itemId][size]) || 0;
      }
    }
    return totalItems;
  };

  const updateCartItemQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((product) => product._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          totalAmount += product.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log(cartItems);
    // localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getTotalCartItems,
    removeFromCart,
    updateCartItemQuantity,
    getCartAmount,
    navigate,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

export { ShopContextProvider, useShopContext };
