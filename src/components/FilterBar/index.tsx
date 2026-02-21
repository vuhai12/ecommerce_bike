import { motion, AnimatePresence } from "framer-motion";
import FilterProducts from "@components/FilterProducts";
import Select from "@components/Select";
import { X } from "lucide-react";

type FilterBarProps = {
  listOptionfilters: {
    id: number;
    label: string;
    options: { id: number; label: string }[];
  }[];
  listChecked: number[];
  setListChecked: React.Dispatch<React.SetStateAction<number[]>>;
  listProducts: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  dataSelect: { id: number; value: string; label: string }[];
  setIsShowFilterBar: React.Dispatch<React.SetStateAction<boolean>>;
  isShowFilterBar: boolean;
};

const FilterBar = ({
  listOptionfilters,
  setIsShowFilterBar,
  listChecked,
  setListChecked,
  listProducts,
  value,
  setValue,
  dataSelect,
  isShowFilterBar,
}: FilterBarProps) => {
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
              <h3 className="text-xl sm:text-2xl font-semibold">
                {listProducts} Products
              </h3>
              <button
                onClick={() => setIsShowFilterBar(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
              <Select options={dataSelect} value={value} setValue={setValue} />

              <FilterProducts
                listOptionfilters={listOptionfilters}
                listChecked={listChecked}
                setListChecked={setListChecked}
              />
            </div>

            {/* FOOTER ACTION */}
            <div className="border-t p-6 bg-white sticky bottom-0">
              <div className="flex gap-4">
                <button
                  onClick={() => setListChecked([])}
                  className="flex-1 border border-gray-300 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                >
                  Clear
                </button>

                <button
                  onClick={() => setIsShowFilterBar(false)}
                  className="flex-1 bg-[#14C9C9] text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterBar;
