import { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function RelatedProducts({ category, subcategory }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { products } = useShopContext();

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => item.category === category);
      productCopy = productCopy.filter(
        (item) => item.subCategory === subcategory,
      );

      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products, subcategory, category]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-2xl sm:text-3xl">
        <Title text1="Related " text2="Products" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipusm is simply dummy text of the printing and typesetting
          industry. Lorem Ipusm has been a fun.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {/* Rendering products */}
        {relatedProducts?.map((product) => (
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

export default RelatedProducts;
