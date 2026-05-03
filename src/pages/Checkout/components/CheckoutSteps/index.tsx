import classNames from "classnames";
import { useLocation } from "react-router-dom";
import {
  CreditCardIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const dataCheckoutSteps = [
  { id: 1, label: "cart", icon: ShoppingCartIcon },
  { id: 2, label: "address", icon: MapPinIcon },
  { id: 3, label: "payment", icon: CreditCardIcon },
];

const CheckoutSteps = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex justify-between relative">
      {dataCheckoutSteps.map((item, _) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex-col gap-[12px] flex justify-center items-center"
          >
            <div
              className={classNames(
                `w-[48px]  border-[1px] border-[#EAECF0] h-[48px] rounded-[50%] flex items-center justify-center`,
                pathname.includes(item.label)
                  ? "bg-[#14C9C9] text-white"
                  : "bg-white"
              )}
            >
              <Icon
                className={classNames(
                  "w-[25px] h-[25px]",
                  pathname.includes(item.label) ? "text-white" : "text-gray-400"
                )}
              />
            </div>
            <p
              className={classNames(
                "text-[14px] ",
                pathname.includes(item.label)
                  ? "text-black font-semibold"
                  : "text-gray-400"
              )}
            >
              {item.label}
            </p>
          </div>
        );
      })}
      <div className="h-[1px] bg-[#EAECF0] absolute left-0 right-0 top-[24px] z-[-1]" />
    </div>
  );
};

export default CheckoutSteps;
