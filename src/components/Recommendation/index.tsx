import { useEffect, useRef, useState } from "react";
import image1 from "@assets/ProductDetail/Section6/image1.svg";
import image2 from "@assets/ProductDetail/Section6/image2.svg";
import image3 from "@assets/ProductDetail/Section6/image3.svg";
import image4 from "@assets/ProductDetail/Section6/image4.svg";
import image5 from "@assets/ProductDetail/Section6/image5.svg";
import ProductItem from "@components/Ui/ProductItem";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GAP = 17;
const ITEMS_PER_VIEW = 3;

const dataSection6 = [
  {
    id: 1,
    image: image1,
    title: "EMotorad X2 Unisex Electric Mountain Bicycle",
    price: "$1299.99",
    rate: "(4.5) 5221",
  },
  {
    id: 2,
    image: image2,
    title: "EMotorad X2 Unisex Electric Mountain Bicycle",
    price: "$1999.99",
    rate: "(4.5) 2221",
  },
  {
    id: 3,
    image: image3,
    title: "EMotorad X2 All-Terrain Unisex E-Bike",
    price: "$3999.99",
    rate: "(4.5) 3221",
  },
  {
    id: 4,
    image: image4,
    title: "EMotorad X2 Unisex Off-Road Electric Cycle",
    price: "$2999.99",
    rate: "(45) 3771",
  },
  {
    id: 5,
    image: image5,
    title: "EMotorad X2 Unisex Mountain Style E-Bicycle",
    price: "$2999.99",
    rate: "(5) 1221",
  },
];

const Recommendation = () => {
  const [current, setCurrent] = useState(0);
  const [isMdUp, setIsMdUp] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dataSection6.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrent((pre) => (pre + 1) % dataSection6.length);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      setIsMdUp(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const itemWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (ITEMS_PER_VIEW - 1)) / ITEMS_PER_VIEW
      : 0;

  const maxWidth =
    itemWidth * dataSection6.length + GAP * (dataSection6.length - 1);

  const maxWidthMd =
    containerWidth * dataSection6.length + GAP * (dataSection6.length - 1);

  const sliderWidth = isMdUp ? maxWidth : maxWidthMd;

  const sliderWidthItem = isMdUp ? itemWidth : containerWidth;
  const handlePreNext = (flag: string) => {
    if (flag == "next") {
      setCurrent(
        (pre) => (pre - 1 + dataSection6.length) % dataSection6.length
      );
    }

    if (flag == "pre") {
      setCurrent((pre) => (pre + 1) % dataSection6.length);
    }
  };

  return (
    <div className="relative flex flex-col gap-[20px] ">
      <div
        ref={containerRef}
        className="w-full overflow-hidden hide-scrollbar "
      >
        {containerWidth > 0 && (
          <div
            className="flex gap-[17px]"
            style={{
              width: `${sliderWidth}px`,
              transform: `translateX(${-current * (sliderWidthItem + GAP)}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            {dataSection6.map((item, _) => {
              return (
                <div
                  key={item.id}
                  style={{ width: `${sliderWidthItem}px`, flexShrink: 0 }}
                >
                  <ProductItem
                    id={item.id}
                    title={item.title}
                    rate="4.5"
                    quantity="3221"
                    image={item.image}
                    price={item.price}
                  />
                </div>
              );
            })}
          </div>
        )}
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

export default Recommendation;
