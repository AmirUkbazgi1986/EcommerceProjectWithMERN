import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShopContextProvider } from "../context/ShopContext";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Outlet />
        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default AppLayout;
