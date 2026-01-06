import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Hero } from "./AboutUs.styles";
import image2 from "@assets/AboutUs/image2.webp";
import image3 from "@assets/AboutUs/image5.jpg";

const AboutUs = () => {
  const [currentWidth, setCurrentWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setCurrentWidth(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });
  return (
    <MainLayout>
      <Hero currentWidth={currentWidth}>
        <div className="flex flex-col gap-[30px] relative z-[99] pt-[100px] xl:max-w-[1200px] mx-auto w-full px-[20px] md:px-[50px] xl:px-0  lg:px-[100px]">
          <div className="md:max-w-[600px]">
            <h2 className="md:text-[50px] text-white font-semibold text-[30px] md:line-clamp-2 line-clamp-1">
              Ride the Future. Go Electric
            </h2>
            <p className="text-gray-200 md:line-clamp-3 line-clamp-3">
              We create innovative, eco-friendly electric bikes that make every
              journey smoother, greener, and more enjoyable. Our mission is to
              bring smart mobility to everyone—one ride at a time.
            </p>
          </div>
        </div>
      </Hero>
      <div className=" mt-[30px] grid md:grid-cols-2 grid-cols-1">
        <div className="w-full  h-[350px] bg-[#23272f] p-[50px] flex flex-col gap-[20px]">
          <h2 className="text-white text-[30px] font-semibold">
            The Eletobike Story
          </h2>
          <p className="text-gray-300 text-[16px] line-clamp-4 ">
            Eletobike was founded with a passion for modern mobility and a
            commitment to cleaner transportation. Inspired by the natural
            landscapes around us, we set out to design electric bikes that make
            everyday travel easier, healthier, and more sustainable.
          </p>
        </div>
        <div className="w-full h-[350px]">
          <img
            src={image2}
            className="object-cover h-full object-center w-full"
          />
        </div>
        <div className="w-full h-[350px]">
          <img
            src={image3}
            className="object-cover h-full object-center w-full"
          />
        </div>
        <div className="w-full h-[350px] bg-[#23272f] p-[50px] flex flex-col gap-[20px]">
          <h2 className="text-white text-[30px] font-semibold">
            What We Believe In
          </h2>
          <p className="text-gray-300 text-[16px] line-clamp-4 ">
            We strive to deliver exceptional quality and dedicated support to
            every customer. Every electric bike we offer is backed by our
            confidence in its performance and a reliable warranty for your peace
            of mind.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
