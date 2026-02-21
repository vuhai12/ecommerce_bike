import logo from "@assets/Header/logo.svg";
import { X, User, ShoppingCart, Bike, Pen } from "lucide-react";
import iconSearch from "@assets/HeaderProduct/icon-search.svg";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { RiTeamLine } from "react-icons/ri";
import classNames from "classnames";

const dataMenus = [
  { id: 1, name: "Home", path: "/", icon: HomeIcon },
  { id: 2, name: "Ebikes", path: "/product-list", icon: Bike },
  { id: 3, name: "Blogs", path: "/blog-list", icon: Pen },
  { id: 4, name: "About us", path: "/about-us", icon: RiTeamLine },
];

const HambugerMenuProduct = ({
  setIsToggle,
}: {
  setIsToggle: (isToggle: boolean) => void;
}) => {
  const handleClose = () => setIsToggle(false);

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[85%] max-w-[360px] bg-[#14c9c9] text-white shadow-2xl flex flex-col p-6 gap-6 animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="h-8" />
          <X
            onClick={handleClose}
            className="cursor-pointer hover:rotate-90 transition duration-300"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <input
            placeholder="Search..."
            className="w-full py-3 pl-12 pr-4 rounded-xl text-black text-sm outline-none focus:ring-2 focus:ring-white"
          />
          <img
            src={iconSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
          />
        </div>

        {/* Menu List */}
        <div className="flex flex-col gap-3 text-[16px] font-medium">
          {dataMenus.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.id} to={item.path} onClick={handleClose}>
                {({ isActive }) => (
                  <div
                    className={classNames(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-white text-[#14c9c9] shadow-md"
                        : "hover:bg-white/20",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/40 my-2" />

        {/* Account & Cart */}
        <NavLink to="/login" onClick={handleClose}>
          {({ isActive }) => (
            <div
              className={classNames(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition",
                isActive
                  ? "bg-white text-[#14c9c9] shadow-md"
                  : "hover:bg-white/20",
              )}
            >
              <User className="w-5 h-5" />
              <span>Sign Up / Sign In</span>
            </div>
          )}
        </NavLink>

        <NavLink to="/cart" onClick={handleClose}>
          {({ isActive }) => (
            <div
              className={classNames(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition",
                isActive
                  ? "bg-white text-[#14c9c9] shadow-md"
                  : "hover:bg-white/20",
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
          )}
        </NavLink>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default HambugerMenuProduct;
