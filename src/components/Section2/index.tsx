import { useEffect, useState } from "react";
import imgBike from "@assets/Section2/image-bike.svg";
import bgImage from "@assets/Section2/bg-image.svg";

const Section2 = () => {
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
          backgroundImage: `url(${bgImage})`,
          width: `${contentWidth}px`,
        }}
        className="min-h-[624px] ml-[50%] -translate-x-[50%]"
      >
        <div className="max-w-[1200px] mx-auto flex items-center flex-col lg:px-[100px] md:px-[50px] px-[20px] xl:px-0">
          <h1 className="md:text-[40px] text-[30px] font-semibold text-[#23272F] mb-[24px]">
            Find your <span className="text-[#14C9C9]">perfect</span> Ebike in
            less than
            <span className="text-[#14C9C9]"> 3 minutes</span>
          </h1>
          <p className="mb-[40px] text-[16px] text-[#667085]">
            Answer a few quick questions and we'll instantly recommend the best
            eBike for you. Get custom recommendations based on your height and
            riding needs.
          </p>
          <img className="mt-[50px]" src={imgBike} />
        </div>
      </div>
    </>
  );
};

export default Section2;
