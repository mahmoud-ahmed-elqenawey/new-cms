import { Outlet } from "react-router";
import Sidebar from "../components/core/Sidebar";
import Navbar from "../components/core/Navbar";

const Layout = () => {
  return (
    <div>
      <Sidebar />

      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
