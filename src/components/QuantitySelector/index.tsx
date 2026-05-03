import { ReducerType } from "@reduxjs/toolkit";
import { useEffect } from "react";

const QuantitySelector = ({
  value,
  setValue,
  handleChangeQuantity,
}: {
  setValue: (fnc: (value: number) => number) => void;
  value: number;
  handleChangeQuantity: (value: number) => void;
}) => {
  const handleDecrease = () => {
    if (value <= 0) return;
    setValue((pre) => {
      handleChangeQuantity(pre - 1);
      return pre - 1;
    });
    console.log("value tại đây", value);
  };

  const handleIncrease = () => {
    setValue((pre) => {
      handleChangeQuantity(pre + 1);
      return pre + 1;
    });
  };

  console.log("valuebbbbbbbbbbbbbbbb", value);

  return (
    <div className="flex border-[1px] cursor-pointer justify-center text-center items-center border-[#EAECF0] rounded-[5px] w-[100px] h-[32px]">
      <div onClick={handleDecrease} className="flex-1">
        -
      </div>
      <div className="flex-1 border-x-[1px] cursor-pointer">{value}</div>
      <div onClick={handleIncrease} className="flex-1">
        +
      </div>
    </div>
  );
};

export default QuantitySelector;
