import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useShopContext } from "../context/ShopContext";
import { useState } from "react";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const { navigate } = useShopContext();
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]  border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="email"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Email address"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Street"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip Code"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Phone "
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
            className="w-1/3 bg-black text-white py-3 mt-4 hover:bg-gray-800 transition-all uppercase"
            onClick={() => navigate("/orders")}
          >
            place order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
