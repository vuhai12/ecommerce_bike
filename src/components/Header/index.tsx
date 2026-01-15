import { useEffect, useState } from "react";
import logo from "@assets/Header/logo.svg";
import iconBike from "@assets/Header/icon-bike.svg";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import HambugerMenuProduct from "@components/HambugerMenuProduct";
import { ChevronDown } from "lucide-react";
import classNames from "classnames";
import { Globe } from "lucide-react";

const dataMenu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Ebikes", path: "/product-list" },
  { id: 3, name: "Blog", path: "/blog-list" },
  { id: 4, name: "About us", path: "/about-us" },
];

const Header = () => {
  const [contentWidth, setContentWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () =>
      setContentWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const [isToggle, setIsToggle] = useState(false);

  const handleToggleHambugerMenu = () => {
    setIsToggle(true);
  };
  const languages = [
    {
      id: 1,
      language: "VN",
      icon: "",
    },
    {
      id: 2,
      language: "EN",
      icon: "",
    },
  ];
  const [language, setLanguage] = useState<string>("VN");

  const handlePickLanguage = (language: string) => {
    setLanguage(language);
  };

  return (
    <div className="w-full">
      <p
        style={{
          width: `${contentWidth}px`,
          marginLeft: `calc(50% - ${contentWidth / 2}px)`,
        }}
        className="py-[10px] px-[10px]  gap-[4px] bg-[#00424D]  justify-center text-[12px] flex items-center"
      >
        <span className="text-white line-clamp-1">
          Amazing discounts on top-quality Ebike! Shop now and save big. Limited
          time offer.
        </span>
        <Link to={"/product-list"} className="text-[#14C9C9] underline">
          Buy now
        </Link>
      </p>
      <div className="h-[84px] flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} />
        </Link>

        <ul className="lg:flex gap-[40px] hidden">
          {dataMenu.map((item) => {
            return (
              <NavLink
                key={item.id}
                className={({ isActive }) =>
                  isActive ? "text-[#14c9c9] font-semibold" : "text-gray-400"
                }
                to={item.path}
              >
                {item.name}
              </NavLink>
            );
          })}
        </ul>
        <div className="lg:flex gap-[24px] hidden  relative">
          <Link to={"/login"}>
            <UserIcon className="w-6 h-6 cursor-pointer" />
          </Link>
          <Link to={"/cart"}>
            <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
          </Link>

          <div className="flex gap-[10px] items-center relative group">
            <Globe className="w-6 h-6 text-gray-500" />
            <p className="font-semibold text-[16px]">{language}</p>
            <ChevronDown className="w-5 h-5 text-black" />
            <div className="absolute hidden top-[100%] border-[1px] border-gray-300 z-[66] bg-white rounded-[5px] flex-col  group-hover:flex ">
              {languages.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={classNames(
                      "flex gap-[8px] px-[30px] py-[10px] cursor-pointer",
                      language == item.language ? "underline " : ""
                    )}
                    onClick={() => handlePickLanguage(item.language)}
                  >
                    <img src={item.icon} />
                    <p>{item.language}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:hidden" onClick={handleToggleHambugerMenu}>
          <Menu className="w-6 h-6 text-black" />
        </div>
      </div>
      <div
        style={{ width: `${contentWidth}px` }}
        className="py-[10px] flex bg-[#14C9C9] ml-[50%] -translate-x-[50%] gap-[8px] items-center justify-center"
      >
        <img src={iconBike} />
        <p>
          <span className="text-white line-clamp-1">
            EMotorad X2 Unisex Mountain Electric Cycle - $1999.99($300 OFF)
          </span>
        </p>
      </div>
      {isToggle && <HambugerMenuProduct setIsToggle={setIsToggle} />}
    </div>
  );
};

export default Header;
