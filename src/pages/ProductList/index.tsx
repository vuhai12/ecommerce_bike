import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Select from "@components/Select";
import FilterProducts from "@components/FilterProducts";
import image1 from "@assets/ProductList/Main/image1.svg";
import image2 from "@assets/ProductList/Main/image2.svg";
import image3 from "@assets/ProductList/Main/image3.svg";
import image4 from "@assets/ProductList/Main/image4.svg";
import image5 from "@assets/ProductList/Main/image5.svg";
import image6 from "@assets/ProductList/Main/image6.svg";
import image7 from "@assets/ProductList/Main/image7.svg";
import image8 from "@assets/ProductList/Main/image8.svg";

import ProductItem from "@components/Ui/ProductItem";
import ProductLayout from "../../layouts/ProductLayout";
import Pagination from "@components/Pagination";
import FilterBar from "@components/FilterBar";
import { SlidersHorizontal } from "lucide-react";

const dataListProducts = [
  {
    id: 1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle",
    color: "green",
    price: "$310",
    image: image1,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
  },
  {
    id: 2,
    title: "SHENGMILO MX05 Full Suspension Electric Mountain Bike",
    color: "green",
    price: "$520",
    image: image2,
    rate: "3",
    category: "Folding",
    tag: "Hot",
  },
  {
    id: 3,
    title: "K9 Carbon / Mid‑drive Fat Tire Electric MTB",
    color: "green",
    price: "$350",
    image: image3,
    rate: "3",
    category: "Comfort",
    tag: "Hot",
  },
  {
    id: 4,
    title: "VDL Mountain Electric Bike for Adults, Fat Tire Ebike",
    color: "green",
    price: "$200",
    image: image4,
    rate: "3",
    category: "Folding",
    tag: "Hot",
  },
  {
    id: 5,
    title: "Viribus Electric Mountain Fat Tirebike 26",
    color: "green",
    price: "$700",
    image: image5,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
  },
  {
    id: 6,
    title: "Santa Cruz Bullit Matte Cider",
    color: "green",
    price: "$320",
    image: image6,
    rate: "3",
    category: "Folding",
    tag: "Hot",
  },
  {
    id: 7,
    title: "Amflow PL Carbon Pro eMTB",
    color: "green",
    price: "$310",
    image: image7,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
  },
  {
    id: 8,
    title: "Specialized Turbo Levo Electric Mountain Bike",
    color: "green",
    price: "$360",
    image: image8,
    rate: "3",
    category: "Hunting/Fishing",
    tag: "Hot",
  },
];

const dataSelect = [
  { id: 1, value: "best-selling", label: "Best Selling" },
  { id: 2, value: "low-to-hight", label: "Low to Hight" },
  { id: 3, value: "hight-to-low", label: "Hight to Low" },
];

const listOptionfilters = [
  {
    id: 1,
    label: "Rating",
    options: [
      { id: 1, label: "5" },
      { id: 2, label: "4" },
      { id: 3, label: "3" },
    ],
  },
  {
    id: 2,
    label: "Category",
    options: [
      { id: 4, label: "Comfort" },
      { id: 5, label: "Light Trail" },
      { id: 6, label: "Hunting/Fishing" },
      { id: 7, label: "Full Suspension" },
    ],
  },
  {
    id: 3,
    label: "Color",
    options: [
      { id: 8, label: "green" },
      { id: 9, label: "red" },
    ],
  },
];
const ProductList = () => {
  const [value, setValue] = useState<string | number | undefined>(
    dataSelect[0].value
  );

  const [listProducts, setListProduct] = useState<any>([]);
  const [listChecked, setListChecked] = useState<number[]>([]);

  useEffect(() => {
    setListProduct(dataListProducts);
  }, [listChecked]);

  const [pageCurrent, setPageCurrent] = useState(1);
  const limit = 6;

  const ofset = (pageCurrent - 1) * limit;
  const endItems = ofset + limit;

  const [isShowFilterBar, setIsShowFilterBar] = useState(false);

  const handleShowFilterBar = () => {
    setIsShowFilterBar(true);
  };

  useEffect(() => {
    if (isShowFilterBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowFilterBar]);

  return (
    <ProductLayout>
      <Hero />
      <div className="flex gap-[10px] flex-col">
        <div
          className="flex gap-[20px] items-center lg:hidden cursor-pointer"
          onClick={handleShowFilterBar}
        >
          <SlidersHorizontal className="w-6 h-6" />
          <h3 className="text-[24px] text-black ">Filters</h3>
        </div>
        <div className="justify-between py-[30px] hidden lg:flex">
          <h3 className="text-[24px] text-black ">
            {dataListProducts.length} Products
          </h3>
          <Select options={dataSelect} value={value} setValue={setValue} />
        </div>
        <div className="flex lg:gap-[50px] flex-col lg:flex-row">
          <div className="lg:flex-1 hidden lg:block">
            <FilterProducts
              listOptionfilters={listOptionfilters}
              listChecked={listChecked}
              setListChecked={setListChecked}
            />
          </div>
          <div className="lg:flex-[3] flex-col flex items-center gap-[30px]">
            <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 sm:gap-[20px]">
              {listProducts.slice(ofset, endItems).map((item: any) => {
                return (
                  <ProductItem
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    rate={item.rate}
                    quantity="1200"
                    image={item.image}
                  />
                );
              })}
            </div>
            <div className="hidden md:block">
              <Pagination
                limit={limit}
                totalItems={dataListProducts.length}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
              />
            </div>
            <div className="md:hidden">
              <button className="py-[10px] px-[20px] bg-[#14c9c9] rounded-[10px] text-[16px] text-white">
                More See
              </button>
            </div>
          </div>
        </div>
      </div>
      {isShowFilterBar && (
        <FilterBar
          isShowFilterBar={isShowFilterBar}
          setIsShowFilterBar={setIsShowFilterBar}
          listOptionfilters={listOptionfilters}
          listChecked={listChecked}
          setListChecked={setListChecked}
          listProducts={listProducts.length}
          value={value}
          setValue={setValue}
          dataSelect={dataSelect}
        />
      )}
    </ProductLayout>
  );
};

export default ProductList;
