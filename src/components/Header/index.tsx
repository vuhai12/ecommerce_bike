import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@assets/Header/logo.svg";
import iconBike from "@assets/Header/icon-bike.svg";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown, Globe } from "lucide-react";
import HambugerMenuProduct from "@components/HambugerMenuProduct";
import classNames from "classnames";
import { dataMenu } from "./dataMenu";

const Header = () => {
  const { i18n, t } = useTranslation();

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
    { id: 1, code: "vi", label: "VN" },
    { id: 2, code: "en", label: "EN" },
  ];

  const handlePickLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="w-full">
      {/* Top banner */}
      <p
        style={{
          width: `${contentWidth}px`,
          marginLeft: `calc(50% - ${contentWidth / 2}px)`,
        }}
        className="py-[10px] px-[10px] bg-[#00424D] text-[12px] flex justify-center items-center gap-[4px]"
      >
        <span className="text-white">{t("banner.top")}</span>
        <Link to={"/product-list"} className="text-[#14C9C9] underline">
          {t("banner.buyNow")}
        </Link>
      </p>

      {/* Main header */}
      <div className="h-[84px] flex justify-between items-center max-w-[1200px] mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>

        <ul className="lg:flex gap-[40px] hidden">
          {dataMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-[#14c9c9] font-semibold" : "text-gray-400"
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </ul>

        <div className="lg:flex gap-[24px] hidden relative">
          <Link to={"/login"}>
            <UserIcon className="w-6 h-6 cursor-pointer" />
          </Link>
          <Link to={"/cart"}>
            <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
          </Link>

          {/* LANGUAGE SWITCH */}
          <div className="flex gap-[10px] items-center relative group cursor-pointer">
            <Globe className="w-6 h-6 text-gray-500" />
            <p className="font-semibold text-[16px] uppercase">
              {i18n.language === "vi" ? "VN" : "EN"}
            </p>
            <ChevronDown className="w-5 h-5" />

            <div className="absolute hidden top-[100%] border border-gray-300 z-[66] bg-white rounded-md flex-col group-hover:flex">
              {languages.map((item) => (
                <div
                  key={item.id}
                  className={classNames(
                    "px-[30px] py-[10px] cursor-pointer hover:bg-gray-100",
                    i18n.language === item.code ? "font-semibold" : "",
                  )}
                  onClick={() => handlePickLanguage(item.code)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden" onClick={handleToggleHambugerMenu}>
          <Menu className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Bottom banner */}
      <div
        style={{ width: `${contentWidth}px` }}
        className="py-[10px] flex bg-[#14C9C9] ml-[50%] -translate-x-[50%] gap-[8px] items-center justify-center"
      >
        <img src={iconBike} alt="bike" />
        <p className="text-white">
          EMotorad X2 Unisex Mountain Electric Cycle - $1999.99 ($300 OFF)
        </p>
      </div>

      {isToggle && <HambugerMenuProduct setIsToggle={setIsToggle} />}
    </div>
  );
};

export default Header;
