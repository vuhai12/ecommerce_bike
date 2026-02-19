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
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={() => setIsShowFilterBar(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="absolute right-0 top-0 bottom-0 
                       w-[85%] sm:w-[400px] 
                       bg-white 
                       flex flex-col 
                       gap-6 
                       p-6 
                       overflow-auto 
                       shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">
                  {listProducts} Products
                </h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setIsShowFilterBar(false)}
                />
              </div>

              <Select options={dataSelect} value={value} setValue={setValue} />
            </div>

            <FilterProducts
              listOptionfilters={listOptionfilters}
              listChecked={listChecked}
              setListChecked={setListChecked}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterBar;
