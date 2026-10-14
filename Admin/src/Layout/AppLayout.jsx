import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <hr className="bg-gray-400 h-2" />
      <div className="flex justify-between w-full min-h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
