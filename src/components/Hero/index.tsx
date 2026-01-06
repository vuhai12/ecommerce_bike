import { useEffect, useState } from "react";
import bgImgae from "@assets/Hero/bg-image.svg";
import iconArow from "@assets/Hero/icon-arrow-up-right.svg";
import { Link } from "react-router-dom";

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
    <>
      <div
        style={{
          width: `${contentWidth}px`,
          backgroundImage: `url(${bgImgae})`,
          marginLeft: `calc(50% - ${contentWidth / 2}px)`,
        }}
        className="relative h-[450px] md:min-h-[500px]  bg-center  bg-cover bg-no-repeat"
      >
        <div className="absolute top-0 left-0 h-full opacity-[50%] bg-[#000000] w-full"></div>
        <div className="flex flex-col gap-[20px] text-white relative z-10 pt-[175px] max-w-[1200px] mx-auto px-[20px] md:px-[50px] xl:px-0 lg:px-[100px]">
          <h1 className="md:text-[50px] text-[20px] font-semibold text-white">
            Aventure.2 Ebike
          </h1>
          <p className="text-[18px]">The power of wildest dreams</p>

          <Link to={"/product-list"}>
            <button className="flex gap-[5px] bg-[#14c9c9] px-[20px] py-[10px] rounded-[10px] w-fit">
              <span> Buy Now</span>
              <img src={iconArow} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
