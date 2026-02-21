import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ================= DATA ================= */

const dataListProducts = [
  {
    id: 1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle",
    color: "green",
    price: "$310",
    image: image1,
    rate: "3",
    category: "Full Suspension",
  },
  {
    id: 2,
    title: "SHENGMILO MX05 Full Suspension Electric Mountain Bike",
    color: "green",
    price: "$520",
    image: image2,
    rate: "3",
    category: "Folding",
  },
  {
    id: 3,
    title: "K9 Carbon / Mid-drive Fat Tire Electric MTB",
    color: "green",
    price: "$350",
    image: image3,
    rate: "3",
    category: "Comfort",
  },
  {
    id: 4,
    title: "VDL Mountain Electric Bike for Adults",
    color: "green",
    price: "$200",
    image: image4,
    rate: "3",
    category: "Folding",
  },
  {
    id: 5,
    title: "Viribus Electric Mountain Fat Tirebike 26",
    color: "green",
    price: "$700",
    image: image5,
    rate: "3",
    category: "Full Suspension",
  },
  {
    id: 6,
    title: "Santa Cruz Bullit Matte Cider",
    color: "green",
    price: "$320",
    image: image6,
    rate: "3",
    category: "Folding",
  },
  {
    id: 7,
    title: "Amflow PL Carbon Pro eMTB",
    color: "green",
    price: "$310",
    image: image7,
    rate: "3",
    category: "Full Suspension",
  },
  {
    id: 8,
    title: "Specialized Turbo Levo Electric Mountain Bike",
    color: "green",
    price: "$360",
    image: image8,
    rate: "3",
    category: "Hunting/Fishing",
  },
];

const dataSelect = [
  { id: 1, value: "best-selling", label: "Best Selling" },
  { id: 2, value: "low-to-high", label: "Low to High" },
  { id: 3, value: "high-to-low", label: "High to Low" },
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
      { id: 8, label: "Folding" },
    ],
  },
  {
    id: 3,
    label: "Color",
    options: [
      { id: 9, label: "green" },
      { id: 10, label: "red" },
    ],
  },
];

/* ================= COMPONENT ================= */

const ProductList = () => {
  const [value, setValue] = useState("best-selling");
  const [listChecked, setListChecked] = useState<number[]>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isShowFilterBar, setIsShowFilterBar] = useState(false);

  const limit = 6;

  /* ================= SORT ================= */

  const sortedProducts = [...dataListProducts].sort((a, b) => {
    const priceA = Number(a.price.replace("$", ""));
    const priceB = Number(b.price.replace("$", ""));

    if (value === "low-to-high") return priceA - priceB;
    if (value === "high-to-low") return priceB - priceA;
    return 0;
  });

  /* ================= PAGINATION ================= */

  const offset = (pageCurrent - 1) * limit;
  const currentProducts = sortedProducts.slice(offset, offset + limit);

  useEffect(() => {
    setPageCurrent(1);
  }, [value]);

  useEffect(() => {
    document.body.style.overflow = isShowFilterBar ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowFilterBar]);

  return (
    <ProductLayout>
      <Hero />

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-between lg:hidden mb-6"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsShowFilterBar(true)}
            >
              <div className="p-2 bg-white shadow rounded-xl">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">Filters</span>
            </div>

            <span className="text-gray-500 text-sm">
              {sortedProducts.length} products
            </span>
          </motion.div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              {sortedProducts.length} Products
            </h2>
            <Select options={dataSelect} value={value} setValue={setValue} />
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6">
                <FilterProducts
                  listOptionfilters={listOptionfilters}
                  listChecked={listChecked}
                  setListChecked={setListChecked}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {currentProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    <AnimatePresence>
                      {currentProducts.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -6 }}
                        >
                          <ProductItem {...item} quantity="1200" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination */}
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      limit={limit}
                      totalItems={sortedProducts.length}
                      pageCurrent={pageCurrent}
                      setPageCurrent={setPageCurrent}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile FilterBar */}
      <FilterBar
        isShowFilterBar={isShowFilterBar}
        setIsShowFilterBar={setIsShowFilterBar}
        listOptionfilters={listOptionfilters}
        listChecked={listChecked}
        setListChecked={setListChecked}
        listProducts={sortedProducts.length}
        value={value}
        setValue={setValue}
        dataSelect={dataSelect}
      />
    </ProductLayout>
  );
};

export default ProductList;
