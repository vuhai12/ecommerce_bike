import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import Select from "@components/Select";
import FilterProducts from "@components/FilterProducts";

import ProductItem from "@components/Ui/ProductItem";
import ProductLayout from "../../layouts/ProductLayout";
import Pagination from "@components/Pagination";
import FilterBar from "@components/FilterBar";
import { SlidersHorizontal } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productSlice";
import ProductSkeleton from "@components/ProductSkeleton";

const listCategory = [
  { label: "Comfort", handle: "comfort" },
  { label: "Light Trail", handle: "light-trail" },
  { label: "Full Suspension", handle: "full-suspension" },
];

const sortOptions = [
  { id: "best-seller", label: "Select.best-seller" },
  { id: "price-asc", label: "Select.price-asc" },
  { id: "price-desc", label: "Select.price-desc" },
];

/* ================= COMPONENT ================= */

const ProductList = () => {
  const [sortValue, setSortValue] = useState("best-seller");

  const [selectedCategory, setSelectedCategory] = useState("comfort");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isShowFilterBar, setIsShowFilterBar] = useState(false);

  const limit = 2;

  /* ================= SORT ================= */

  /* ================= PAGINATION ================= */

  useEffect(() => {
    setPageCurrent(1);
  }, [sortValue]);

  useEffect(() => {
    document.body.style.overflow = isShowFilterBar ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowFilterBar]);

  const dispatch = useAppDispatch();
  const { list, loading, error, totalProducts } = useAppSelector(
    (state) => state.products,
  );

  const fetchProductsByTab = () => {
    dispatch(
      fetchProducts({
        collectionHandle: selectedCategory,
        tabKey: sortValue,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        pageCurrent,
        limit,
      }),
    );
  };

  useEffect(() => {
    fetchProductsByTab();
  }, [sortValue, selectedCategory, pageCurrent]);

  const handlePriceChangeComplete = (range: [number, number]) => {
    setPriceRange(range);

    dispatch(
      fetchProducts({
        collectionHandle: selectedCategory,
        tabKey: sortValue,
        minPrice: range[0],
        maxPrice: range[1],
      }),
    );
  };

  if (error) return <p>{error}</p>;
  console.log("list", list);
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

            <span className="text-gray-500 text-sm">Products</span>
          </motion.div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <Select
              options={sortOptions}
              sortValue={sortValue}
              setSortValue={setSortValue}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6">
                <FilterProducts
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  listCategory={listCategory}
                  priceRange={priceRange}
                  onPriceChangeComplete={handlePriceChangeComplete}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : list.length === 0 ? (
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
                      {list.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -6 }}
                        >
                          <ProductItem {...item} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination */}
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      limit={limit}
                      totalItems={totalProducts || 0}
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        listCategory={listCategory}
        priceRange={priceRange}
        onPriceChangeComplete={handlePriceChangeComplete}
        options={sortOptions}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </ProductLayout>
  );
};

export default ProductList;
