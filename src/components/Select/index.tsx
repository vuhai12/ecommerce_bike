import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SelectProps } from "../../types/product.type";

const Select = ({ options, sortValue, setSortValue }: SelectProps) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const { t } = useTranslation();

  const handleSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const handleGetValue = (val: string) => {
    setSortValue(val);
    setIsOpenSelect(false);
  };
  const currentLabel =
    options.find((item) => item.id === sortValue)?.label ??
    "Select.best-seller";

  console.log("options", options);
  console.log("sortValue", sortValue);

  return (
    <div className="relative cursor-pointer z-10 ">
      <div
        onClick={handleSelect}
        className="flex justify-between border w-fit md:min-w-[202px] border-[#D0D5DD] items-center rounded-[12px] py-[10px] px-[14px]"
      >
        <span className="text-[16px] text-[#23272F] font-semibold">
          {t(currentLabel)}
        </span>
        <ChevronDown className="w-[20px] h-[20px] text-[#98A2B3]" />
      </div>

      {isOpenSelect && (
        <div className="absolute w-full top-[50px] border bg-white border-[#D0D5DD] rounded-[12px] py-[10px] px-[14px] flex flex-col shadow-lg">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => handleGetValue(item.id)}
              className={`cursor-pointer py-[10px]  ${item.id == sortValue ? "bg-[#14c9c9] px-[14px] text-white font-semibold -mx-[14px] w-[calc(100%+28px)]" : ""}`}
            >
              {t(item.label)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
