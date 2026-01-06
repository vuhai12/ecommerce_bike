import FilterProducts from "@components/FilterProducts";
import Select from "@components/Select";
import { X } from "lucide-react";

const FilterBar = ({
  listOptionfilters,
  setIsShowFilterBar,
  listChecked,
  setListChecked,
  listProducts,
  value,
  setValue,
  dataSelect,
}: {
  listOptionfilters: {
    id: number;
    label: string;
    options: { id: number; label: string }[];
  }[];
  listChecked: number[];
  setListChecked: (listChecked: number[]) => void;
  listProducts: number;
  value: string | number | undefined;
  setValue: (val: string | number | undefined) => void;
  dataSelect: { id: number; value: string; label: string }[];
  setIsShowFilterBar: (isShowFilterBar: boolean) => void;
  isShowFilterBar: boolean;
}) => {
  return (
    <div className="fixed inset-0  z-[999]">
      <div
        className="absolute inset-0 bg-black bg-opacity-35"
        onClick={() => setIsShowFilterBar(false)}
      ></div>
      <div className="w-[85%] bg-white flex flex-col gap-[20px] p-[20px] absolute bottom-0 right-0 top-0 overflow-auto">
        <div className="w-full  flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <h3 className="text-[24px] text-black ">{listProducts} Products</h3>
            <X
              className="cursor-pointer"
              onClick={() => setIsShowFilterBar(false)}
            />
          </div>

          <Select options={dataSelect} value={value} setValue={setValue} />
        </div>
        <div>
          <FilterProducts
            listOptionfilters={listOptionfilters}
            listChecked={listChecked}
            setListChecked={setListChecked}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
