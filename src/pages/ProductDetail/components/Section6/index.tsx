import { useState } from "react";
import image1 from "@assets/ProductDetail/Section6/image-red-1.webp";
import ProductItem from "@components/Ui/ProductItem";
import { ArrowLeft, ArrowRight } from "lucide-react";

const dataSection6 = [
  {
    id: 1,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle1",
    price: "$1999.99",
    rate: "(4.5) 3221",
  },
  {
    id: 2,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle2",
    price: "$1999.99",
    rate: "(4.5) 3221",
  },
  {
    id: 3,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle3",
    price: "$1999.99",
    rate: "(4.5) 3221",
  },
  {
    id: 4,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle4",
    price: "$1999.99",
    rate: "(4.5) 3221",
  },
  {
    id: 5,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle5",
    price: "$1999.99",
    rate: "(4.5) 3221",
  },
];

const Section6 = () => {
  const [current, setCurrent] = useState(0);
  const handlePreNext = (flag: string) => {
    if (flag == "next") {
      setCurrent(
        (pre) => (pre - 1 + dataSection6.length) % dataSection6.length,
      );
    }

    if (flag == "pre") {
      setCurrent((pre) => (pre + 1) % dataSection6.length);
    }
  };

  const maxWidth =
    ((1200 - 2 * 17) / 3) * dataSection6.length +
    (dataSection6.length - 1) * 17;

  return (
    <div className="relative flex flex-col gap-[20px]">
      <h3 className="text-[#23272F] font-semibold text-[24px]">
        Recommended for you
      </h3>
      <div className="w-full  overflow-auto hide-scrollbar">
        <div
          className="flex gap-[17px]"
          style={{
            width: `${maxWidth}px`,
            transform: `translateX(${-current * ((1200 - 2 * 17) / 3 + 17)}px)`,
          }}
        >
          {dataSection6.map((item, _) => {
            return (
              <ProductItem
                id={item.id}
                title={item.title}
                rate="4.5"
                quantity="3221"
                image={item.image}
                price={item.price}
              />
            );
          })}
        </div>
        <div
          onClick={() => handlePreNext("pre")}
          className="absolute  bg-white left-0  top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-[50%] border-[1px] border-[#EAECF0] flex items-center justify-center"
        >
          <ArrowLeft className="w-[20px] h-[20px] cursor-pointer" />
        </div>
        <div
          onClick={() => handlePreNext("next")}
          className="w-[36px] bg-white right-0 absolute translate-x-1/2 top-1/2 -translate-y-1/2 h-[36px] rounded-[50%] border-[1px] border-[#EAECF0] flex items-center justify-center"
        >
          <ArrowRight className="w-[20px] h-[20px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Section6;
