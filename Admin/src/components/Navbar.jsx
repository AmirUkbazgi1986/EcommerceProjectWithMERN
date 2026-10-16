import { assets } from "../assets/assets";
function Navbar({ setToken }) {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} className="w-[max(10%,80px)]" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
