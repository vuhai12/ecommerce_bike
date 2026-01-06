import { useEffect, useState } from "react";
import logo from "@assets/Footer/logo.svg";
import { Phone, Mail } from "lucide-react";
import icon1 from "@assets/Footer/iconTwice.svg";
import icon2 from "@assets/Footer/iconLinked.svg";
import icon3 from "@assets/Footer/iconFace.svg";
import icon4 from "@assets/Footer/iconGithub.svg";
import icon5 from "@assets/Footer/iconHi.svg";
import icon6 from "@assets/Footer/iconBall.svg";
import { Container, Wrapper } from "./Footer.styles";

const dataIcons = [
  { id: 1, icon: icon1 },
  { id: 2, icon: icon2 },
  { id: 3, icon: icon3 },
  { id: 4, icon: icon4 },
  { id: 5, icon: icon5 },
  { id: 6, icon: icon6 },
];

const Footer = () => {
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
      <Wrapper contentWidth={contentWidth}>
        <Container>
          <div className="grid lg:grid-cols-5 lg:gap-[107px] grid-cols-1 gap-[30px] text-[#EAECF0] py-[48px] border-b-[1px] border-[#98A2B3]">
            <div className="flex flex-col gap-[32px]">
              <div>
                <img src={logo} alt="logo" />
              </div>

              <p className=" text-[#98A2B3]">
                Design amazing digital experiences that create more happy in the
                world.
              </p>
            </div>

            <ul className="flex gap-[16px] flex-col">
              <li className="text-[18px] font-semibold">Support</li>
              <li>Return Policy</li>
              <li>Shipping Info</li>
              <li>Support</li>
              <li>Warranty</li>
            </ul>

            <ul className="flex gap-[16px] flex-col">
              <li className="text-[18px] font-semibold">Electric Bike</li>
              <li>All Electric Bike</li>
              <li>Accessories</li>
              <li>Gift Cards</li>
              <li>Promotions</li>
            </ul>
            <ul className="flex gap-[16px] flex-col">
              <li className="text-[18px] font-semibold">Company</li>
              <li>About us</li>
              <li>Blog</li>
            </ul>
            <div className="flex gap-[16px] flex-col ">
              <p className=" text-[18px] font-semibold">Contact</p>
              <div className="flex gap-[8px] items-center">
                <Phone className="w-[16px] h-[16px] text-white" />
                <p className=" text-[#EAECF0]">+1 (907) 555-0101</p>
              </div>
              <div className="flex gap-[8px] flex-wrap items-center">
                <Mail className="w-4 h-4 text-white" />
                <p className=" text-[#EAECF0] breal-all line-clamp-1">
                  curtis.weaver@example.com
                </p>
              </div>
            </div>
          </div>
          <div className="py-[48px] px-[32px] flex md:flex-row flex-col gap-[20px] justify-between items-center">
            <p className="text-[#98A2B3]">
              © 2077 ElectroBike. All rights reserved.
            </p>
            <div className="flex gap-[24px] flex-wrap">
              {dataIcons.map((item, _) => {
                return <img src={item.icon} key={item.id} />;
              })}
            </div>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default Footer;
