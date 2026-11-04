import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  // the cartItems will be an object with the following structure:
  // {
  //   productId: {
  //     size: quantity
  //   }
  // }
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product`);

      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message || "Error");
      }
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl]);

  const addToCart = async (itemId, size) => {
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
    // console.log(itemId, size, cartData);
    // console.log("backendUrl", backendUrl);
    // Send the updated cart data to the backend
    if (token) {
      try {
        const res = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("res", res.data);

        if (res.data.success) {
          toast.success(res.data.message || "Added to cart");
        } else {
          toast.error(res.data.message || "Error adding to cart");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error adding to cart");
      }
    }
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

  const updateCartItemQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    // 1. updating the cart in the frontend
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    // console.log("cartData", cartData);
    //   2. updating the cart in the backend
    if (token) {
      try {
        const res = await axios.patch(
          `${backendUrl}/api/cart/${itemId}`,
          { itemId, size, quantity },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("res", res.data);
        if (res.data.success) {
          toast.success(res.data.message || "Cart updated");
        } else {
          toast.error(res.data.message || "Error updating cart");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Error updating cart");
      }
    }
  };

  const getUserCart = useCallback(
    async (token) => {
      if (token) {
        try {
          const res = await axios.get(
            `${backendUrl}/api/cart/get`,

            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          // console.log("res", res.data);
          if (res.data.success) {
            setCartItems(res.data.cartData);
          } else {
            toast.error(res.data.message || "Error fetching cart");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message || "Error fetching cart");
        }
      }
    },
    [token, backendUrl],
  );
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
    async function loading() {
      await fetchProducts();
    }
    loading();
  }, [fetchProducts]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token, getUserCart]);
  // useEffect(() => {
  //   console.log(cartItems);
  //   // localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getTotalCartItems,
    removeFromCart,
    updateCartItemQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl,
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
