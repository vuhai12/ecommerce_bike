import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconSearch from "@assets/HeaderProduct/icon-search.svg";
import iconCart from "@assets/HeaderProduct/icon-cart.svg";
import iconUser from "@assets/HeaderProduct/icon-user.svg";
import logo from "@assets/Header/logo.svg";
import { Menu } from "lucide-react";
import HambugerMenuProduct from "@components/HambugerMenuProduct";

const dataMenus = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Ebikes", path: "/product-list" },
  { id: 3, name: "Blog", path: "/blog-list" },
  { id: 4, name: "About us", path: "/about-us" },
];

const HeaderProduct = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <header className="w-full sticky top-0 z-[9999] bg-white shadow-sm">
      {/* Top row */}
      <div className="px-4 flex justify-between items-center h-[72px]">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Search */}
          <div className="relative w-[300px] xl:w-[380px]">
            <input
              placeholder="Search products..."
              className="w-full py-2.5 pl-11 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#14c9c9] transition"
            />
            <img
              src={iconSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
            />
          </div>

          {/* User + Cart */}
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center gap-2 pr-6 border-r border-gray-200 hover:text-black transition">
              <img src={iconUser} className="w-4 h-4" />
              <Link to="/login">Sign Up / Sign In</Link>
            </div>

            <div className="flex items-center gap-2 pl-6 hover:text-black transition">
              <img src={iconCart} className="w-4 h-4" />
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <button className="lg:hidden" onClick={() => setIsToggle(true)}>
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Bottom Nav - Desktop */}
      <div className="hidden lg:flex justify-center border-t border-gray-100">
        <div className="flex gap-10 h-[56px] items-center text-sm font-medium">
          {dataMenus.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `
                relative pb-1 transition
                ${isActive ? "text-[#14c9c9]" : "text-gray-600 hover:text-black"}
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#14c9c9] after:transition-transform
                ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {isToggle && <HambugerMenuProduct setIsToggle={setIsToggle} />}
    </header>
  );
};

export default HeaderProduct;
