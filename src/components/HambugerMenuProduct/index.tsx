import logo from "@assets/Header/logo.svg";
import { X } from "lucide-react";
import iconSearch from "@assets/HeaderProduct/icon-search.svg";
import { NavLink } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Bike } from "lucide-react";
import { Pen } from "lucide-react";
import { RiTeamLine } from "react-icons/ri";
import classNames from "classnames";

const dataMenus = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    name: "Ebikes",
    path: "/product-list",
    icon: Bike,
  },
  {
    id: 3,
    name: "Blogs",
    path: "/blog-list",
    icon: Pen,
  },
  {
    id: 4,
    name: "About us",
    path: "/about-us",
    icon: RiTeamLine,
  },
];

const HambugerMenuProduct = ({
  setIsToggle,
}: {
  setIsToggle: (isToggle: boolean) => void;
}) => {
  const handleClose = () => {
    setIsToggle(false);
  };
  return (
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      <div className="flex flex-col  p-[20px] text-white gap-[20px] w-[85%] absolute bottom-0 top-0  bg-[#14c9c9]">
        <div className="flex justify-between">
          <img src={logo} />

          <X onClick={handleClose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-[30px] text-[20px]">
          <div className="relative flex items-center">
            <input
              placeholder="search"
              className="py-[10px] w-full pr-[14px] pl-[44px] border-[#EAECF0] border-[1px] rounded-[12px]"
            />
            <img
              src={iconSearch}
              className="absolute left-[14px] w-[20px] h-[20px]"
            />
          </div>

          <div className=" gap-[20px] flex flex-col  ">
            {dataMenus.map((item, _) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={classNames("")}
                >
                  {({ isActive }) => {
                    return (
                      <div
                        className={classNames(
                          "flex gap-[15px] items-center",
                          isActive
                            ? "bg-white py-[10px] mr-[-20px] ml-[-20px] px-[20px]"
                            : ""
                        )}
                      >
                        <Icon
                          className={classNames(
                            "w-[24px] ",
                            isActive ? "text-[#14c9c9] " : "text-white"
                          )}
                        />
                        <span
                          className={classNames(
                            isActive
                              ? "text-[#14c9c9] font-semibold "
                              : "text-white"
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  }}
                </NavLink>
              );
            })}
          </div>
          <NavLink to={"/login"}>
            {({ isActive }) => {
              return (
                <div
                  className={classNames(
                    "flex gap-[15px] items-center",
                    isActive
                      ? "bg-white text-[#14c9c9] font-semibold py-[10px] mr-[-20px] ml-[-20px] px-[20px]"
                      : "text-white"
                  )}
                >
                  <User className="w-6 h-6" />
                  <p>Sign Up/Sign In</p>
                </div>
              );
            }}
          </NavLink>
          <NavLink to={"/cart"}>
            {({ isActive }) => {
              return (
                <div
                  className={classNames(
                    "flex gap-[15px] items-center",
                    isActive
                      ? "bg-white text-[#14c9c9] font-semibold py-[10px] mr-[-20px] ml-[-20px] px-[20px]"
                      : "text-white"
                  )}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <p>Cart</p>
                </div>
              );
            }}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HambugerMenuProduct;
