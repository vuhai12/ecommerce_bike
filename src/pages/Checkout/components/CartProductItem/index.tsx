import QuantitySelector from "@components/QuantitySelector";
import { useAppDispatch } from "../../../../app/hooks";
import {
  getCartThunk,
  removeCartLinesThunk,
  updateCartThunk,
} from "../../../../features/cart/cartSlice";
import { useState } from "react";

const CartProductItem = ({
  image,
  title,
  price,
  id,
  quantity,
}: {
  image: string;
  title: string;
  price: string;
  id: string;
  quantity: number;
}) => {
  const [value, setValue] = useState(quantity);
  const dispatch = useAppDispatch();

  const handleRemoveLine = async (lineId: string) => {
    const cartId = localStorage.getItem("shopify_cart_id");

    if (!cartId) return;

    await dispatch(
      removeCartLinesThunk({
        cartId,
        lineIds: [lineId],
      }),
    );
    await dispatch(getCartThunk(cartId));
  };

  const handleChangeQuantity = async (newQuantity: number) => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) return;

    await dispatch(
      updateCartThunk({
        cartId,
        lines: [
          {
            id,
            quantity: newQuantity,
          },
        ],
      }),
    );
    await dispatch(getCartThunk(cartId));
  };

  return (
    <div className="grid border-[1px]  rounded-2xl md:grid-cols-[2fr_3fr_100px_100px_50px] grid-cols-1 gap-[30px]  border-gray-200 p-[20px]">
      <div className="">
        <img src={image} loading="lazy" />
      </div>

      <p className="text-[14px] text-black font-semibold">{title}</p>
      <div>
        <QuantitySelector
          setValue={setValue}
          value={value}
          handleChangeQuantity={handleChangeQuantity}
        />
      </div>
      <p className="text-[14px] font-semibold text-black">${price}</p>
      <p
        onClick={() => handleRemoveLine(id)}
        className="underline text-[14px] text-[#F53F3F] cursor-pointer"
      >
        Remove
      </p>
    </div>
  );
};

export default CartProductItem;
