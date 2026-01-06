import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconSearch from "@assets/HeaderProduct/icon-search.svg";
import iconCart from "@assets/HeaderProduct/icon-cart.svg";
import iconUser from "@assets/HeaderProduct/icon-user.svg";
import logo from "@assets/Header/logo.svg";
import { Menu } from "lucide-react";
import HambugerMenuProduct from "@components/HambugerMenuProduct";

const dataMenus = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 1,
    name: "Ebikes",
    path: "/product-list",
  },
  {
    id: 4,
    name: "Blog",
    path: "/blog-list",
  },
  {
    id: 5,
    name: "About us",
    path: "/about-us",
  },
];

const HeaderProduct = () => {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggleHambugerMenu = () => {
    setIsToggle(true);
  };
  return (
    <>
      <div className="flex justify-between h-[72px] items-center ">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="gap-[40px] hidden lg:flex">
          <div className="relative flex items-center">
            <input
              placeholder="search"
              className="py-[10px] w-[387px] pr-[14px] pl-[44px] border-[#EAECF0] border-[1px] rounded-[12px]"
            />
            <img
              src={iconSearch}
              className="absolute left-[14px] w-[20px] h-[20px]"
            />
          </div>
          <div className="flex text-[16px] text-[#667085]">
            <div className="flex gap-[8px] pr-[20px] border-r-[1px] border-[#EAECF0] items-center">
              <img src={iconUser} className="w-[20px] h-[20px]" />
              <Link to={"/login"}>Sign Up/Sign In</Link>
            </div>

            <div className="flex gap-[8px] pl-[20px] items-center">
              <img src={iconCart} className="w-[20px] h-[20px]" />
              <Link to={"/cart"}>
                <p>Cart</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:hidden" onClick={handleToggleHambugerMenu}>
          <Menu className="w-6 h-6 text-black" />
        </div>
      </div>
      <div className="py-[16px] hidden lg:flex gap-[38px] text-[16px] text-[#667085] h-[56px] justify-center items-center">
        {dataMenus.map((item, _) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-semibold text-[#14c9c9]" : "text-black"
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
      {isToggle && <HambugerMenuProduct setIsToggle={setIsToggle} />}
    </>
  );
};

export default HeaderProduct;
