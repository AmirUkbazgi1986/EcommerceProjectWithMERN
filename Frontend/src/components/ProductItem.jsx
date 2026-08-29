import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";

function ProductItem({ id, image, name, price }) {
  const { currency } = useShopContext();
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="product image"
          className="w-full h-auto object-cover hover:scale-110 transition ease-in-out "
        />
      </div>
      <p className="text-sm pt-3 pb-1">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
