import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import RangeSlide from "@components/RangeSlider";
import { motion, AnimatePresence } from "framer-motion";
import Radio from "@components/Radio";
import { FilterProductsProps } from "../../types/product.type";

const FilterProducts = ({
  selectedCategory,
  setSelectedCategory,
  listCategory,
  priceRange,
  onPriceChangeComplete,
}: FilterProductsProps) => {
  const [isOpenTabCategory, setIsOpenTabCategory] = useState<boolean>(true);
  const handleOpenSelect = () => {
    setIsOpenTabCategory(!isOpenTabCategory);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-gray-200 p-5 gap-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      {/* SELECTED TAGS */}

      {/* PRICE */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-900">Price</h3>
        <RangeSlide
          value={priceRange}
          onChangeComplete={onPriceChangeComplete}
        />
      </div>

      {/* FILTER GROUPS */}
      <div className="flex flex-col divide-y divide-gray-100">
        <div className="py-4">
          {/* GROUP HEADER */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleOpenSelect()}
          >
            <h3 className="text-base font-semibold text-gray-800">Category</h3>

            {isOpenTabCategory ? (
              <ChevronUp className="w-5 h-5 text-gray-500 transition" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 transition" />
            )}
          </div>

          {/* OPTIONS */}
          <AnimatePresence initial={false}>
            {isOpenTabCategory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-5 flex flex-col gap-3 pl-1">
                  {listCategory.map((option) => (
                    <div key={option.handle}>
                      <Radio
                        label={option.label}
                        checked={selectedCategory === option.handle}
                        setChecked={setSelectedCategory}
                        handle={option.handle}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
