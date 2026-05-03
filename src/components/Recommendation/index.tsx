import { useEffect, useRef, useState } from "react";

import ProductItem from "@components/Ui/ProductItem";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchProducts } from "../../features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const GAP = 17;
const ITEMS_PER_VIEW = 3;

const Recommendation = () => {
  const [current, setCurrent] = useState(0);
  const [isMdUp, setIsMdUp] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (list.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrent((pre) => (pre + 1) % list.length);
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

  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
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

  const maxWidth = itemWidth * list.length + GAP * (list.length - 1);

  const maxWidthMd = containerWidth * list.length + GAP * (list.length - 1);

  const sliderWidth = isMdUp ? maxWidth : maxWidthMd;

  const sliderWidthItem = isMdUp ? itemWidth : containerWidth;
  const handlePreNext = (flag: string) => {
    if (flag == "next") {
      setCurrent((pre) => (pre - 1 + list.length) % list.length);
    }

    if (flag == "pre") {
      setCurrent((pre) => (pre + 1) % list.length);
    }
  };

  console.log("lits", list);

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
            {list.map((item, _) => {
              return (
                <div
                  key={item.id}
                  style={{ width: `${sliderWidthItem}px`, flexShrink: 0 }}
                >
                  <ProductItem
                    handle={item.handle}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    averageRating={item.averageRating}
                    reviewCount={item.reviewCount}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-[20px] items-center justify-center">
        <div
          onClick={() => handlePreNext("pre")}
          className=" z-50 bg-white left-0  w-[36px] h-[36px] rounded-[50%] border-[1px] border-[#EAECF0] flex items-center justify-center"
        >
          <ArrowLeft className="w-[20px] h-[20px] cursor-pointer" />
        </div>
        <div
          onClick={() => handlePreNext("next")}
          className="w-[36px] bg-white right-0  h-[36px] rounded-[50%] border-[1px] border-[#EAECF0] flex items-center justify-center"
        >
          <ArrowRight className="w-[20px] h-[20px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
