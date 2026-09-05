import { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const { cartItems, products, currency, removeFromCart } = useShopContext();

  useEffect(() => {
    const data = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          data.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            product: products.find((product) => product._id === items),
          });
        }
      }
    }

    setCartData(data);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="your " text2="cart" />
      </div>
      <div>
        {cartData?.map((item) => (
          <div
            key={item._id}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-right gap-6">
              <img
                src={item.product.image[0]}
                alt={item.product.name}
                className="w-16 sm:w-20 object-cover"
              />
              <div>
                <h3 className="text-sm sm:text-lg font-medium">
                  {item.product.name}
                </h3>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {item.product.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            <input
              type="number"
              min={1}
              defaultValue={item.quantity}
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 sm:py-2 text-center active:outline-none focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <img
              className="w-4 mr-4 sm:w-5 cursor-pointer"
              src={assets.bin_icon}
              alt="bin"
              onClick={() => removeFromCart(item._id, item.size)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
