import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Checkbox from "@components/Checkbox";
import RangeSlide from "@components/RangeSlider";

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
    listChecked.includes(option.id)
  );

  const handleOpenSelect = (id: number) => {
    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((item) => item != id));
    } else {
      setIsOpen([...isOpen, id]);
    }
  };

  const handleRemoveChecked = (id: number) => {
    setListChecked(listChecked.filter((item) => item != id));
  };

  const handleClearAllChecked = () => {
    setListChecked([]);
  };
  return (
    <div className="flex flex-col rounded-[12px] bg-[#F9FAFB] px-[16px] gap-[20px] py-[16px]">
      <div className=" flex justify-between font-semibold items-center">
        <h3 className="text-[20px] text-[#23272F]">Filters</h3>
        <p
          className="text-[16px] text-[#3491FA] cursor-pointer"
          onClick={handleClearAllChecked}
        >
          Clear
        </p>
      </div>
      <div className=" flex gap-[8px] flex-wrap text-[18px] text-white">
        {selectedOption.map((item) => {
          return (
            <div
              onClick={() => handleRemoveChecked(item.id)}
              className="py-[4px] cursor-pointer px-[12px] rounded-[16px] bg-[#14C9C9] flex gap-[3px]  items-center"
            >
              <span className="flex items-center">{item.label}</span>
              <X className="w-[12px] h-[12px] text-[#B7F4EC] flex items-center cursor-pointer" />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-[16px] text-[18px]">
        <h3 className=" text-[#23272F] font-semibold">Price</h3>
        <RangeSlide />
      </div>

      {listOptionfilters.map((item, _) => {
        return (
          <div className="flex flex-col text-[18px]">
            <div
              className="py-[10px] justify-between font-semibold flex items-center"
              onClick={() => handleOpenSelect(item.id)}
            >
              <h3 className=" text-[#23272F]">{item.label}</h3>
              {isOpen.includes(item.id) ? (
                <ChevronDown className="w-6 h-6 text-gray-600 cursor-pointer" />
              ) : (
                <ChevronUp className="w-6 h-6 text-gray-600 cursor-pointer" />
              )}
            </div>
            {isOpen.includes(item.id) && (
              <div className="flex flex-col  ">
                {item.options.map((item) => {
                  return (
                    <div className="py-[8px] ">
                      <Checkbox
                        label={item.label}
                        value={item.id}
                        setListChecked={setListChecked}
                        listChecked={listChecked}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterProducts;
