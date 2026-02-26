import QuantitySelector from "@components/QuantitySelector";
import { useState } from "react";

const CartProductItem = ({
  image,
  color,
  title,
  price,
  setProductsInCart,
  id,
  productsInCart,
}: {
  image: string;
  color: string;
  title: string;
  price: string;
  setProductsInCart: (
    listProductCarts: {
      id: number;
      image: string;
      title: string;
      price: string;
      color: string;
    }[],
  ) => void;
  productsInCart: {
    id: number;
    image: string;
    title: string;
    price: string;
    color: string;
  }[];
  id: number;
}) => {
  const [value, setValue] = useState(0);
  const handleRemoveItem = () => {
    const productNew = productsInCart.filter((item) => item.id != id);
    setProductsInCart(productNew);
  };
  return (
    <div className="flex gap-[16px]  items-center py-[16px] flex-wrap">
      <div className="w-[120px] h-[120px]">
        <img src={image} loading="lazy" />
      </div>

      <div className="flex flex-col gap-[10px] flex-1 ">
        <div className="flex justify-between flex-wrap">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[18px] text-black font-semibold">{title}</p>
            <p className="text-[12px]">
              <span className="text-[#14C9C9]">Color </span>
              <span className="text-[#667085]">{color}</span>
            </p>
          </div>
          <div>
            <QuantitySelector setValue={setValue} value={value} />
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-[18px] font-semibold text-black">{price}</p>
          <p
            onClick={() => handleRemoveItem()}
            className="underline text-[14px] text-[#F53F3F] cursor-pointer"
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
