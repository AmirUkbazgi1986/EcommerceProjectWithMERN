import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShopContextProvider } from "../context/ShopContext";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default AppLayout;
