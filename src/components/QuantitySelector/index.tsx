const QuantitySelector = ({
  value,
  setValue,
}: {
  setValue: (fnc: (value: number) => number) => void;
  value: number;
}) => {
  const handleDecrease = () => {
    if (value <= 0) return;
    setValue((pre) => pre - 1);
  };

  const handleIncrease = () => {
    setValue((pre) => pre + 1);
  };
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
