import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useShopContext } from "../context/ShopContext";
import { useEffect, useState } from "react";

function SearchBar() {
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } = useShopContext();
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return visible && showSearch ? (
    <div className="border border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full  w-3/4 sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt="search image" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="cross image"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
}

export default SearchBar;
