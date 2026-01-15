import { useEffect, useState } from "react";
import image1 from "@assets/Section5/image1.svg";
import image2 from "@assets/Section5/image2.svg";
import image3 from "@assets/Section5/image3.svg";
import { Container, Wrapper } from "./Section5.styles";
import imageBg from "@assets/Section5/bgImage.svg";

const dataSection5 = [
  {
    id: 1,
    title: "Test Rides",
    value: "3000+",
    des: "We offer emission-free local travel, Not only doing something good for yourself, but also for everyone else.",
  },
  {
    id: 2,
    title: "Repairs",
    value: "127",
    des: "Simply bock using our super app, chose your destination, jump in to our nearby services and wheedle only.",
  },
  {
    id: 3,
    title: "Miles of smiles",
    value: "38700",
    des: "Know your travel octet's in advance then you can simply pay it using our super apps or choose another method.",
  },
];

const Section5 = () => {
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
      <div className="flex items-center flex-col gap-[20px] max-w-[900px] mx-auto">
        <h1 className="md:text-[40px] font-semibold text-[30px]">
          Choose your <span className="text-[#14C9C9]">E-bike</span>
        </h1>
        <p className="text-[18px] text-[#667085] text-center">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>
      <div className="flex lg:gap-[18px]  lg:flex-row flex-col gap-[30px]">
        <div className="flex-1 relative">
          <img
            src={image1}
            alt="image"
            className="w-full h-full object-cover "
          />
          <p className="absolute bottom-[20px] left-[20px] z-[50] text-[30px] font-semibold text-white">
            Brand
          </p>
          <div className="bg-black absolute inset-0 bg-opacity-60"></div>
        </div>
        <div className="flex-1 relative">
          <img
            src={image2}
            alt="image"
            className="w-full h-full object-cover"
          />
          <p className="absolute bottom-[20px] z-[50] left-[20px] text-[30px] font-semibold text-white">
            Styles
          </p>
          <div className="bg-black absolute inset-0 bg-opacity-60"></div>
        </div>
        <div className="flex-1 relative">
          <img
            src={image3}
            alt="image"
            className="w-full h-full object-cover"
          />
          <p className="absolute z-[50] bottom-[20px] left-[20px] text-[30px] font-semibold text-white">
            Features
          </p>
          <div className="bg-black absolute inset-0 bg-opacity-60"></div>
        </div>
      </div>
      <div className="flex gap-[64px] lg:flex-row flex-col">
        {dataSection5.map((item, _) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-[20px] justify-center items-center"
            >
              <h1 className="text-[48px] text-[#14C9C9] font-semibold">
                {item.value}
              </h1>
              <p className="text-[24px] text-[#23272F] font-semibold">
                {item.title}
              </p>
              <p className="text-[16px] text-[#667085] text-center">
                {item.des}
              </p>
            </div>
          );
        })}
      </div>
      <Wrapper contentWidth={contentWidth}>
        <div
          className="py-[150px] px-[30px] items-center flex relative gap-[160px] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${imageBg})` }}
        >
          <div className="bg-gray-600 bg-opacity-30 absolute inset-0 z-[30]"></div>
          <Container>
            <div className="flex flex-col gap-[20px] flex-1 md:max-w-[500px]">
              <h1 className="md:text-[48px] font-semibold text-[30px]">
                <span className="text-[#14C9C9]">Book</span>
                <span className="text-white">Your Test</span>
                <span className="text-[#14C9C9]">Ride</span>
              </h1>
              <p className="text-[18px] text-[#EAECF0] line-clamp-2  md:line-clamp-5">
                Don't just imagine the ride of your dreams, feel it for yourself
                with a test ride! Book now and experience the exhilaration,
                comfort, and performance of our cutting-edge vehicles. From the
                sleek curves to the responsive handling.
              </p>
              <button className="text-[18px] w-full md:w-fit text-white rounded-[12px] px-[20px] py-[12px] bg-[#14C9C9] font-semibold">
                Book ride now
              </button>
            </div>
            <div className="inset-0 bg-black/50 absolute z-[-1]"></div>
          </Container>
        </div>
      </Wrapper>
    </>
  );
};

export default Section5;
