import { useState } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = {
  options: { id?: number; label: string; value: string }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Select = ({ options, value, setValue }: SelectProps) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const handleSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const handleGetValue = (val: string) => {
    setValue(val);
    setIsOpenSelect(false);
  };

  return (
    <div className="relative cursor-pointer z-10">
      <div
        onClick={handleSelect}
        className="flex justify-between border w-fit md:min-w-[202px] border-[#D0D5DD] items-center rounded-[12px] py-[10px] px-[14px]"
      >
        <span className="text-[16px] text-[#23272F] font-semibold">
          {options.find((item) => item.value === value)?.label}
        </span>
        <ChevronDown className="w-[20px] h-[20px] text-[#98A2B3]" />
      </div>

      {isOpenSelect && (
        <div className="absolute w-full top-[50px] border bg-white border-[#D0D5DD] rounded-[12px] py-[10px] px-[14px] flex flex-col shadow-lg">
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => handleGetValue(item.value)}
              className="cursor-pointer py-[10px] hover:bg-[#e5e6e8] hover:w-[calc(100%+28px)] hover:px-[14px] hover:-mx-[14px]"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
