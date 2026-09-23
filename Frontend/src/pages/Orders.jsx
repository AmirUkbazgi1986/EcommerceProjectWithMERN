import Title from "../components/Title";
import { useShopContext } from "../context/ShopContext";

function Orders() {
  const { products, currency } = useShopContext();

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div>
        {products.slice(1, 4).map((product) => (
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
                    <p>Quantity: 1</p>
                    <p>Size:XL</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">25, July 2026</span>
                  </p>
                  <p>
                    Payment:<span className="text-gray-400"> COD</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="bg-green-500 min-w-2 h-2 border rounded-full"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
            </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
