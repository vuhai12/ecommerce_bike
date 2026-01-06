import React from "react";
import iconCheck from "@assets/ProductDetail/Section2/icon-check.svg";
import classNames from "classnames";

const Checkbox = ({
  value,
  setListChecked,
  listChecked,
  label,
}: {
  value: number;
  setListChecked: (value: number[]) => void;
  listChecked: number[];
  label?: string;
}) => {
  const handleCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setListChecked([...listChecked, value]);
    } else {
      setListChecked(listChecked.filter((item) => item != value));
    }
  };

  return (
    <label className="flex gap-[15px] items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={listChecked?.includes(value)}
        value={value}
        onChange={(e) => handleCheckedList(e)}
      />
      <div
        className={classNames(
          "w-[20px] h-[20px] rounded-[8px] flex justify-center items-center",
          listChecked?.includes(value)
            ? "bg-[#14C9C9]"
            : "border-[#D0D5DD] border-[1px]"
        )}
      >
        {listChecked?.includes(value) && <img src={iconCheck} />}
      </div>

      <span className="text-[16px] text-[#23272F]">{label}</span>
    </label>
  );
};

export default Checkbox;
