import { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);
  const { products } = useShopContext();

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-2xl sm:text-3xl">
        <Title text1="Best" text2="Sellers" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipusm is simply dummy text of the printing and typesetting
          industry. Lorem Ipusm has been a fun.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {bestSeller?.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
