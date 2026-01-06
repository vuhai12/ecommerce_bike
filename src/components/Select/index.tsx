import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  options,
  value,
  setValue,
}: {
  options: { label: string; value: number | string }[];
  value: string | number | undefined;
  setValue: (val: number | string | undefined) => void;
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const handleSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const handleGetValue = (val: string | number | undefined) => {
    setValue(val);
    setIsOpenSelect(false);
  };
  return (
    <>
      <div className="relative cursor-pointer z-[999]">
        <div
          onClick={handleSelect}
          className="flex justify-between border-[1px] w-fit md:min-w-[202px] border-[#D0D5DD] items-center rounded-[12px] py-[10px] px-[14px]"
        >
          <span className="text-[16px] text-[#23272F] font-semibold">
            {options.find((item) => item.value == value)?.label}
          </span>
          <ChevronDown className="w-[20px] h-[20px] text-[#98A2B3] cursor-pointer" />
        </div>
        {isOpenSelect && (
          <div className="absolute w-full top-[50px] border-[1px] bg-white border-[#D0D5DD] rounded-[12px] py-[10px] px-[14px] flex flex-col ">
            {options.map((item) => {
              return (
                <div
                  onClick={() => handleGetValue(item.value)}
                  className="cursor-pointer py-[10px] bg-white hover:bg-[#e5e6e8] hover:w-[calc(100%+28px)] hover:px-[14px] hover:-mx-[14px]"
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
