import { useState, useCallback, useEffect } from "react";
import { backendUrl, currency } from "../Layout/AppLayout";
import axios from "axios";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product`);
      // console.log("LIST RESPONSE:", res.data);
      if (res.data.success) {
        setList(res.data.products);
      } else {
        toast.error(res.data.message || "Error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }, []);

  const removeFood = useCallback(
    async (productId) => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.delete(
          `${backendUrl}/api/product/${productId}`,

          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log("REMOVE RESPONSE:", res.data);

        await fetchList();

        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error("error", res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [fetchList],
  );

  useEffect(() => {
    const loading = async function () {
      await fetchList();
    };

    loading();
  }, [fetchList]);

  return (
    <>
      <p>All Products List</p>
      <div className="flex flex-col gap-2">
        {/* --- List Table Title ---  */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm  ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* --- Product Lists ---  */}

        {list?.map((item) => {
          return (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm  "
            >
              {/* <img src={`${backendUrl}/images/` + item.image[0]} alt="image" /> */}
              <img className="w-12" src={item.image[0]} alt="image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                className="cursor-pointer text-right md:text-center text-lg"
                onClick={() => removeFood(item._id)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default List;
