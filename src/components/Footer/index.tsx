import logo from "@assets/Footer/logo.svg";
import { Phone, Mail } from "lucide-react";
import icon1 from "@assets/Footer/iconTwice.svg";
import icon2 from "@assets/Footer/iconLinked.svg";
import icon3 from "@assets/Footer/iconFace.svg";
import icon4 from "@assets/Footer/iconGithub.svg";
import icon5 from "@assets/Footer/iconHi.svg";
import icon6 from "@assets/Footer/iconBall.svg";

const dataIcons = [
  { id: 1, icon: icon1 },
  { id: 2, icon: icon2 },
  { id: 3, icon: icon3 },
  { id: 4, icon: icon4 },
  { id: 5, icon: icon5 },
  { id: 6, icon: icon6 },
];

const Footer = () => {
  return (
    <footer className="bg-[#101828] w-full">
      <div className=" px-4 sm:px-6 lg:px-0 pt-[100px]  max-w-[1200px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#98A2B3]">
          {/* Logo + Description */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="logo" className="w-[140px]" />
            <p className="text-[#98A2B3] text-sm leading-relaxed">
              Design amazing digital experiences that create more happy in the
              world.
            </p>
          </div>

          {/* Support */}
          <ul className="flex flex-col gap-4 text-sm">
            <li className="text-white text-lg font-semibold">Support</li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Return Policy
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Shipping Info
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Support
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Warranty
            </li>
          </ul>

          {/* Electric Bike */}
          <ul className="flex flex-col gap-4 text-sm">
            <li className="text-white text-lg font-semibold">Electric Bike</li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              All Electric Bike
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Accessories
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Gift Cards
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Promotions
            </li>
          </ul>

          {/* Company */}
          <ul className="flex flex-col gap-4 text-sm">
            <li className="text-white text-lg font-semibold">Company</li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              About us
            </li>
            <li className="text-[#98A2B3] hover:text-white cursor-pointer transition">
              Blog
            </li>
          </ul>

          {/* Contact */}
          <div className="flex flex-col gap-4 text-sm">
            <p className="text-white text-lg font-semibold">Contact</p>

            <div className="flex gap-2 items-center text-[#98A2B3]">
              <Phone className="w-4 h-4" />
              <span>+1 (907) 555-0101</span>
            </div>

            <div className="flex gap-2 items-start text-[#98A2B3] break-all">
              <Mail className="w-4 h-4 mt-[2px]" />
              <span>curtis.weaver@example.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row gap-6 justify-between items-center text-sm">
          <p className="text-[#98A2B3] text-center md:text-left">
            © 2077 ElectroBike. All rights reserved.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            {dataIcons.map((item) => (
              <img
                key={item.id}
                src={item.icon}
                alt="social icon"
                className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
