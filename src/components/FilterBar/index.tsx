import { motion, AnimatePresence } from "framer-motion";
import FilterProducts from "@components/FilterProducts";
import { X } from "lucide-react";
import {
  FilterBarProps,
  FilterProductsProps,
  SelectProps,
} from "../../types/product.type";
import Select from "@components/Select";

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  listCategory,
  priceRange,
  onPriceChangeComplete,
  setIsShowFilterBar,
  isShowFilterBar,
  options,
  sortValue,
  setSortValue,
}: FilterBarProps & FilterProductsProps & SelectProps) => {
  return (
    <AnimatePresence>
      {isShowFilterBar && (
        <div className="fixed inset-0 z-[999]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsShowFilterBar(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="
              absolute right-0 top-0 bottom-0
              w-[75%] sm:w-[420px]
              bg-white
              flex flex-col
              shadow-2xl
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl sm:text-2xl font-semibold">Products</h3>
              <button
                onClick={() => setIsShowFilterBar(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
              <Select
                options={options}
                sortValue={sortValue}
                setSortValue={setSortValue}
              />

              <FilterProducts
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                listCategory={listCategory}
                priceRange={priceRange}
                onPriceChangeComplete={onPriceChangeComplete}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterBar;
