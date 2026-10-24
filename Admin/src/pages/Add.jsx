import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../Layout/AppLayout";
import { toast } from "react-toastify";
// import { useEffect } from "react";

function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    size: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSize = (e) => {
    if (data.size.includes(e.target.innerHTML)) {
      setData((prev) => ({
        ...prev,
        size: prev.size.filter((item) => item !== e.target.innerHTML),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        size: [...prev.size, e.target.innerHTML],
      }));
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      // 1. Create a new form data

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);

      // Stringify array so backend can parse it properly
      formData.append("size", JSON.stringify(data.size));

      formData.append("bestseller", data.bestseller);

      // Only append images if they have actually been selected
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Debugging loop to check FormData contents safely
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const res = await axios.post(`${backendUrl}/api/product/`, formData, {
        headers: {
          authorization: `Bearer ${token}`, // Standard Bearer token format
        },
      });
      // console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message || "Product added successfully!");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
          bestseller: false,
          size: [],
        });
      } else {
        toast.error(res.data.message || "Error adding product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-full flex flex-col items-start gap-3 "
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload image"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload image"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload image"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload image"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          value={data.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-125 px-3 py-2 "
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          value={data.description}
          onChange={handleChange}
          name="description"
          placeholder="Write content here"
          className="w-full max-w-125 px-3 py-2 "
          required
        ></textarea>
      </div>
      <div className="w-full flex flex-col gap-2 sm:flex-row sm:gap-8 ">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            value={data.category}
            onChange={handleChange}
            name="category"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            value={data.subCategory}
            onChange={handleChange}
            name="subCategory"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={data.price}
            onChange={handleChange}
            name="price"
            type="number"
            placeholder="25"
            className="w-full px-3 py-2 sm:w-30 "
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Size</p>
        <div className="w-full flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div>
            <p
              onClick={handleSize}
              className={`${data.size.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer text-center`}
            >
              S
            </p>
          </div>
          <div>
            <p
              onClick={handleSize}
              className={`${data.size.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer text-center`}
            >
              M
            </p>
          </div>
          <div>
            <p
              onClick={handleSize}
              className={`${data.size.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer text-center`}
            >
              L
            </p>
          </div>
          <div>
            <p
              onClick={handleSize}
              className={`${data.size.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer text-center`}
            >
              XL
            </p>
          </div>
          <div>
            <p
              onClick={handleSize}
              className={`${data.size.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer text-center`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 mt-2 ">
        <input
          onChange={handleChange}
          checked={data.bestseller}
          type="checkbox"
          name="bestseller"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 px-6 py-3 mt-4 bg-black text-white cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default Add;
