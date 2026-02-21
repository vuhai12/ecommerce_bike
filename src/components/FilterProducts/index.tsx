import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Checkbox from "@components/Checkbox";
import RangeSlide from "@components/RangeSlider";
import { motion, AnimatePresence } from "framer-motion";

const FilterProducts = ({
  listOptionfilters,
  listChecked,
  setListChecked,
}: {
  listOptionfilters: {
    id: number;
    label: string;
    options: { id: number; label: string }[];
  }[];
  listChecked: number[];
  setListChecked: (val: number[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState<number[]>([]);

  const allFilterOptions = listOptionfilters.flatMap((group) => group.options);
  const selectedOption = allFilterOptions.filter((option) =>
    listChecked.includes(option.id),
  );

  const handleOpenSelect = (id: number) => {
    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((item) => item !== id));
    } else {
      setIsOpen([...isOpen, id]);
    }
  };

  const handleRemoveChecked = (id: number) => {
    setListChecked(listChecked.filter((item) => item !== id));
  };

  const handleClearAllChecked = () => {
    setListChecked([]);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-gray-200 p-5 gap-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {listChecked.length > 0 && (
          <button
            onClick={handleClearAllChecked}
            className="text-sm font-medium text-[#14C9C9] hover:underline transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* SELECTED TAGS */}
      {selectedOption.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selectedOption.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRemoveChecked(item.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#14C9C9]/10 text-[#14C9C9] text-sm font-medium cursor-pointer hover:bg-[#14C9C9]/20 transition"
            >
              <span>{item.label}</span>
              <X className="w-3 h-3" />
            </div>
          ))}
        </div>
      )}

      {/* PRICE */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-900">Price</h3>
        <RangeSlide />
      </div>

      {/* FILTER GROUPS */}
      <div className="flex flex-col divide-y divide-gray-100">
        {listOptionfilters.map((item) => (
          <div key={item.id} className="py-4">
            {/* GROUP HEADER */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleOpenSelect(item.id)}
            >
              <h3 className="text-base font-semibold text-gray-800">
                {item.label}
              </h3>

              {isOpen.includes(item.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-500 transition" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 transition" />
              )}
            </div>

            {/* OPTIONS */}
            <AnimatePresence initial={false}>
              {isOpen.includes(item.id) && (
                <motion.div
                  key={item.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex flex-col gap-2 pl-1">
                    {item.options.map((option) => (
                      <div key={option.id}>
                        <Checkbox
                          label={option.label}
                          value={option.id}
                          setListChecked={setListChecked}
                          listChecked={listChecked}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterProducts;
