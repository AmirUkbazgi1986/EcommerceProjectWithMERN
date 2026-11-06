import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useShopContext } from "../context/ShopContext";
import { useState } from "react";
import axios from "axios";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    token,
    getCartAmount,
    delivery_fee,
    products,
  } = useShopContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderItems = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = structuredClone(
            products.find((product) => product._id === itemId),
          );
          if (product) {
            product.size = size;
            product.quantity = cartItems[itemId][size];
            orderItems.push(product);
          }
        }
      }
    }

    // console.log("Order Items:", orderItems);
    const amount = getCartAmount() + delivery_fee;

    const orderData = {
      items: orderItems,
      amount,
      address: formData,
      paymentMethod: method,
    };
    // console.log("Order Data:", orderData);

    switch (method) {
      // API call for Stripe payment method
      case "stripe":
        {
          const res = await axios.post(
            `${backendUrl}/api/order/place/stripe`,
            orderData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(res.data);
          if (res.data.success) {
            toast.success("Order placed successfully");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error("Failed to place order: " + res.data.message);
          }
        }
        break;

      // API call for Razorpay payment method
      case "razorpay":
        {
          const res = await axios.post(
            `${backendUrl}/api/order/place/razorpay`,
            orderData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(res.data);
          if (res.data.success) {
            toast.success("Order placed successfully");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error("Failed to place order: " + res.data.message);
          }
        }
        break;

      // API call for Cash on Delivery payment method
      case "cod":
        {
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(res.data);
          if (res.data.success) {
            toast.success("Order placed successfully");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error("Failed to place order: " + res.data.message);
          }
        }
        break;

      default:
        toast.error("Invalid payment method selected.");
        return;
    }
  };

  useState(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]  border-t"
    >
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            name="firstName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Email address"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={formData.street}
            onChange={handleInputChange}
            name="street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Street"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            required
          />
          <input
            type="text"
            value={formData.state}
            onChange={handleInputChange}
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            value={formData.zipCode}
            onChange={handleInputChange}
            name="zipCode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip Code"
            required
          />
          <input
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            name="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Phone "
            required
          />
        </div>
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setMethod("stripe")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-700" : ""}`}
            ></p>
            <img
              className="h-5 mx-4"
              src={assets.stripe_logo}
              alt="strip logo"
            />
          </div>
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setMethod("razorpay")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-700" : ""}`}
            ></p>
            <img
              className="h-5 mx-4"
              src={assets.razorpay_logo}
              alt="razorpay logo"
            />
          </div>
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setMethod("cod")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-700" : ""}`}
            ></p>
            <p className="uppercase text-gray-500 text-sm font-medium mx-4">
              Cash on Delivery
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-1/3 bg-black text-white py-3 mt-4 hover:bg-gray-800 transition-all uppercase"
            onClick={() => navigate("/orders")}
          >
            place order
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
