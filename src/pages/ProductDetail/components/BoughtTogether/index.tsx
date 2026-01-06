import { useState } from "react";
import image1 from "@assets/ProductDetail/Section2/image1.svg";
import image2 from "@assets/ProductDetail/Section2/image2.svg";
import image3 from "@assets/ProductDetail/Section2/image3.svg";
import image4 from "@assets/ProductDetail/Section2/image4.svg";
import image5 from "@assets/ProductDetail/Section2/image5.svg";
import iconCart from "@assets/ProductDetail/Section2/icon-cart.svg";
import Checkbox from "@components/Checkbox";

const dataBoughtTogethers = [
  {
    id: 1,
    image: image1,
    title: "Lista USB Rechargeable 360° Rotation Bike Bicycle Front Headlight",
    price: "$8.5",
    rate: "(4.5) 3221",
  },
  {
    id: 2,
    image: image2,
    title: "Strauss Bicycle Bottle Holder (Black)",
    price: "$4.2",
    rate: "(4.5) 3221",
  },
  {
    id: 3,
    image: image3,
    title:
      "Lista Lista002 Bicycle Silicone Saddle Seat and Cycling Cushion Pad Bike Gel Cover",
    price: "$10.0",
    rate: "(4.5) 3221",
  },
  {
    id: 4,
    image: image4,
    title:
      "RYLAN Bicycle Helmet with Detachable Visor Back Light & Insect Net Padded Adjustable Size Cycling Helmet Lightweight Mountain Bike Cycle Helmets for Mens (Blue)",
    price: "$25.6",
    rate: "(4.5) 3221",
  },
  {
    id: 5,
    image: image5,
    title:
      "Leosportz Bicycle Atom Mudguard with Reflective Tape, Black-Green Clip-on Clip-on Front & Rear Fender",
    price: "$25.6",
    rate: "(4.5) 3221",
  },
];

const BoughtTogether = () => {
  const [listChecked, setListChecked] = useState<number[]>([]);
  return (
    <div className="flex p-[20px] rounded-[16px] border-[1px] gap-[20px] border-[#EAECF0] flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] font-semibold text-black">
          Frequently bought together
        </h3>
        <p className="text-[14px] text-black underline">+2 more accessories</p>
      </div>
      <div className="grid gap-[16px] lg:grid-cols-5 md:grid-cols-4 grid-cols-2">
        {dataBoughtTogethers.map((item, _) => {
          return (
            <div className="flex flex-col gap-[12px] ">
              <div className=" relative">
                <img
                  src={item.image}
                  alt="image"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-[10px] right-[10px]">
                  <Checkbox
                    setListChecked={setListChecked}
                    listChecked={listChecked}
                    value={item.id}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[14px] line-clamp-2">{item.title}</h3>
                <p className="text-[12px]">{item.rate}</p>
                <p className="text-[16px] font-semibold">{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-[20px] flex md:justify-between md:flex-row flex-col gap-[20px] border-t-[1px] border-[#EAECF0]">
        <div className="flex gap-[40px] items-center flex-wrap">
          <div>
            <p className="text-[14px] text-[#667085]">2 Add-ons</p>
            <p className="text-[18px] text-black font-semibold">2 Add-ons</p>
          </div>
          <div className="text-[#667085] text-[24px]">+</div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] text-[#667085]">2 Add-ons</p>
            <p className="text-[18px] text-black font-semibold">2 Add-ons</p>
          </div>
          <div className="text-[#667085] text-[24px]">=</div>
          <div>
            <p className="text-[14px] text-[#667085]">2 Add-ons</p>
            <p className="text-[18px] text-black font-semibold">2 Add-ons</p>
          </div>
        </div>
        <div>
          <button className="rounded-[12px] px-[18px] py-[10px] flex gap-[8px] text-[16px] text-white bg-[#14C9C9]">
            <img src={iconCart} />
            <p className="">Add 3 items to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoughtTogether;
