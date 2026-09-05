import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

function Product() {
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const { products, currency, addToCart } = useShopContext();

  const getProductData = useCallback(async () => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);

      return null;
    }
  }, [id, products]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  if (!productData) {
    return <div>Loading...</div>;
  }
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className="w-24 sm:w-full sm:mb-3 cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="Product"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col ">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-3xl font-medium mt-5">
            {currency}
            {productData.price} {productData.currency}
          </p>
          <p className="mt-5   text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 ${selectedSize === size ? "border-orange-500" : "border-gray-300"}`}
                  key={index}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-md w-1/2 mt-4 hover:bg-orange-600 transition-colors duration-300 uppercase"
              onClick={() => {
                if (selectedSize) {
                  addToCart(productData._id, selectedSize);
                } else {
                  toast.error("Please select a size before adding to cart.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  //
                }
              }}
            >
              Add to Cart
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="flex flex-col gap-1 mt-4 text-sm text-gray-500">
              <p>100% Original product.</p>
              <p>Cash on delivery is availabe for this product.</p>
              <p>Easy return exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Product Reviews & Description */}
      <div className="mt-20">
        <div className="flex items-center">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            An e-commerce is an online platform that facilates the buying and
            selling of products or services over the internet. It serves as a
            virtual marketplace where business and individuals can showcase
            their product, interact with customers, and conduct transactions
            without the need for a physical presence. E-commerce websites have
            gained popularity due to their conveniece, accessibility, and the
            global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed description,images,prices and any available
            variations(e.g. sizes, colors). Each product usually has its own
            dedicated page with relative information
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subcategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0">This is product page {id}</div>
  );
}

export default Product;
