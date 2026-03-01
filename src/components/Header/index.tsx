import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@assets/Header/logo.svg";
import iconBike from "@assets/Header/icon-bike.webp";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown, Globe } from "lucide-react";
import HambugerMenuProduct from "@components/HambugerMenuProduct";
import classNames from "classnames";
import { dataMenu } from "./dataMenu";

const Header = () => {
  const { i18n, t } = useTranslation();
  const [isToggle, setIsToggle] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);

  const languages = [
    { id: 1, code: "vi", label: "VN" },
    { id: 2, code: "en", label: "EN" },
  ];

  const handlePickLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <header className="w-full sticky top-0 z-[100] bg-white shadow-sm">
      {/* Top banner */}
      <div className="w-full bg-[#00424D] text-xs">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex justify-center items-center gap-2">
          <span className="text-white">{t("banner.top")}</span>
          <Link
            to="/product-list"
            className="text-[#14C9C9] underline hover:opacity-80 transition"
          >
            {t("banner.buyNow")}
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1200px] mx-auto px-4 h-[72px] md:h-[84px] flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 xl:gap-10">
          {dataMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  "transition font-medium",
                  isActive
                    ? "text-[#14c9c9]"
                    : "text-gray-500 hover:text-black",
                )
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-6 relative">
          <Link to="/login">
            <UserIcon className="w-6 h-6 text-gray-600 hover:text-black transition" />
          </Link>

          <Link to="/cart">
            <ShoppingCartIcon className="w-6 h-6 text-gray-600 hover:text-black transition" />
          </Link>

          {/* Language */}
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setIsOpenLang(!isOpenLang)}
              className="flex items-center gap-2"
            >
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="font-semibold uppercase text-sm">
                {i18n.language === "vi" ? "VN" : "EN"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition ${
                  isOpenLang ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpenLang && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md overflow-hidden min-w-[100px] z-50">
                {languages.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      handlePickLanguage(item.code);
                      setIsOpenLang(false);
                    }}
                    className={classNames(
                      "px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer",
                      i18n.language === item.code ? "font-semibold" : "",
                    )}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden" onClick={() => setIsToggle(true)}>
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Bottom banner */}
      <div className="w-full bg-[#14C9C9]">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <img src={iconBike} alt="bike" className="h-4 md:h-5" />
          <p className="text-white text-sm md:text-base">{t("banner.title")}</p>
        </div>
      </div>

      {isToggle && <HambugerMenuProduct setIsToggle={setIsToggle} />}
    </header>
  );
};

export default Header;
