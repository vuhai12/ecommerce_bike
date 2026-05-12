const QuantitySelector = ({
  quantity,
  updateQuantity,
}: {
  quantity: number;
  updateQuantity: (quantity: number) => void;
}) => {
  const handleDecrease = () => {
    if (quantity <= 0) return;
    updateQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(quantity + 1);
  };

  return (
    <div className="flex border-[1px] cursor-pointer justify-center text-center items-center border-[#EAECF0] rounded-[5px] w-[100px] h-[32px]">
      <div onClick={handleDecrease} className="flex-1">
        -
      </div>
      <div className="flex-1 border-x-[1px] cursor-pointer">{quantity}</div>
      <div onClick={handleIncrease} className="flex-1">
        +
      </div>
    </div>
  );
};

export default QuantitySelector;
