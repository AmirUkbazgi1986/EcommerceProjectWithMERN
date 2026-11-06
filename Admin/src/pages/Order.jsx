import { useEffect, useState } from "react";
import { backendUrl, currency } from "../Layout/AppLayout";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Order() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      const res = await axios.get(`${backendUrl}/api/order/all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log("res.data", res.data.orders);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(() => {
    async function loading() {
      await fetchOrders();
    }
    loading();
  }, [fetchOrders]);

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders?.map((order) => {
          return (
            <di
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img src={assets.parcel_icon} alt="parcel box" className="w-12" />
              <div>
                <div>
                  {/* displaying the items array */}
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index} className="py-0.5">
                          {item.name} x {item.quantity}
                          <span> {item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p key={index} className="py-0.5">
                          {item.name} x {item.quantity}
                          <span> {item.size} </span> ,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium uppercase">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ""}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipCode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment:{order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency} {order.totalAmount}
              </p>
              <select className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </di>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
