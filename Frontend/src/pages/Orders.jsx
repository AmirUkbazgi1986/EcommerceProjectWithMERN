import axios from "axios";
import Title from "../components/Title";
import { useShopContext } from "../context/ShopContext";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function Orders() {
  const [productOrders, setProductOrders] = useState([]);
  const { currency, token, backendUrl } = useShopContext();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log("res.data", res.data);
      if (res.data.success) {
        let allOrdersItem = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        console.log("allOrdersItem", allOrdersItem);
        setProductOrders(allOrdersItem.reverse());
      } else {
        console.error("Failed to fetch orders:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    async function loadOrders() {
      if (token) {
        await fetchOrders();
      }
    }
    loadOrders();
  }, [fetchOrders, token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div>
        {productOrders?.map((product) => (
          <div
            key={product._id}
            className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4  "
          >
            <div className="flex items-start gap-4  ">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-16  object-cover"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="sm:text-base font-medium">{product.name}</h3>
                  <div className="flex items-center gap-3 text-base text-gray-500">
                    <p>
                      {currency}
                      {product.price}
                    </p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Size:{product.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(product.date).toDateString()}
                    </span>
                  </p>
                  <p>
                    Payment:
                    <span className="text-gray-400">
                      {" "}
                      {product.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="bg-green-500 min-w-2 h-2 border rounded-full"></p>
                <p className="text-sm md:text-base">{product.status}</p>
              </div>
            </div>
            <button
              onClick={fetchOrders}
              className="border px-4 py-2 text-sm font-medium rounded-sm"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
