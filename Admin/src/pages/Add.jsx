import { useState } from "react";
import { assets } from "../assets/assets";
import { useEffect } from "react";

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
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <form className="w-full flex flex-col items-start gap-3 ">
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
            <p className="bg-slate-200 px-3 py-1 cursor-pointer text-center">
              S
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer text-center">
              M
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer text-center">
              L
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer text-center">
              XL
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer text-center">
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 mt-2 ">
        <input type="checkbox" id="bestseller" />
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
