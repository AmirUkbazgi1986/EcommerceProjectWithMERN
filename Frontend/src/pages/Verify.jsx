import { useSearchParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token, navigate, setCartItems, backendUrl } = useShopContext();

  const verifyPayment = useCallback(async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        {
          success,
          orderId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        navigate("/orders");
        setCartItems({});
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  }, [backendUrl, success, orderId, navigate, setCartItems, token]);

  useEffect(() => {
    async function verifyLoading() {
      if (token) {
        await verifyPayment();
      }
    }
    verifyLoading();
  }, [verifyPayment, token]);
  return <div>verify</div>;
}

export default Verify;
