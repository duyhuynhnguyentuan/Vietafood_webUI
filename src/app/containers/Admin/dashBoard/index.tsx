import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../../utils/utils";
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SellIcon from '@mui/icons-material/Sell';
const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUser(user.email)
    if (isTokenExpired()) {
      localStorage.removeItem("user");
      navigate("/admin/login");
    }

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`md:flex flex-col w-64 bg-gray-800 ${isMenuOpen ? "block" : "hidden"} md:block`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Vietafood</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
          <NavLink
              to="/admin/dashboard/products"
              className={({isActive}) => {
                return isActive ? "flex items-center space-x-2  px-4 py-2 mt-2 text-primary hover:bg-gray-700" : "flex items-center space-x-2  px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              }} 
            >
            <Inventory2Icon/>
            <p>
              Sản phẩm
            </p>
            </NavLink>
            <NavLink
              to="/admin/dashboard/orders"
              className={({isActive}) => {
                return isActive ? "flex items-center space-x-2  px-4 py-2 mt-2 text-primary hover:bg-gray-700" : "flex items-center space-x-2  px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              }} 
            >
            <ListAltIcon/>
            <p>
              Hóa đơn
            </p>
            </NavLink>
            <NavLink
              to="/admin/dashboard/coupons"
              className={({isActive}) => {
                return isActive ? "flex items-center space-x-2  px-4 py-2 mt-2 text-primary hover:bg-gray-700" : "flex items-center space-x-2  px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              }} 
            >
            <SellIcon/>
            <p>
              Coupon
            </p>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between min-h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button onClick={toggleMenu} className="text-gray-500 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center pr-4">
            <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                <LogoutIcon/>
            </button>
          </div>
        </div>
        {/* content nó nằm đây */}
        <div className="mt-10 p-4">
          <h1 className="text-2xl text-primary font-bold mb-4">
            <span className="text-black">
            Welcome{" "}
            </span>
            {currentUser}
          </h1>
        <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
