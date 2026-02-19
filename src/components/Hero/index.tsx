import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgImgae from "@assets/Hero/bg-image.svg";
import iconArow from "@assets/Hero/icon-arrow-up-right.svg";
import { Link } from "react-router-dom";
import { t } from "i18next";

const Hero = () => {
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () =>
      setContentWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        width: `${contentWidth}px`,
        backgroundImage: `url(${bgImgae})`,
        marginLeft: `calc(50% - ${contentWidth / 2}px)`,
      }}
      className="relative h-[450px] md:min-h-[500px] bg-center bg-cover bg-no-repeat"
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full opacity-[50%] bg-[#000000] w-full"></div>

      <div className="flex flex-col gap-[20px] text-white relative z-10 pt-[175px] max-w-[1200px] mx-auto px-[20px] md:px-[50px] xl:px-0 lg:px-[100px]">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:text-[50px] text-[20px] font-semibold"
        >
          {t("banner.titleBanner")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[18px]"
        >
          {t("banner.desBanner")}
        </motion.p>

        {/* Button */}
        <Link to={"/product-list"}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex gap-[5px] bg-[#14c9c9] px-[20px] py-[10px] rounded-[10px] w-fit items-center"
          >
            <span> {t("banner.buyNow")}</span>
            <motion.img
              src={iconArow}
              alt="arrow"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Hero;
