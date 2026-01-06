import iconCheck from "@assets/OrderSummary/icon-check.svg";
import iconDiscount from "@assets/OrderSummary/icon-discount.svg";
import iconRotate from "@assets/OrderSummary/icon-rotate-right.svg";
import iconTicketCircle from "@assets/OrderSummary/icon-tick-circle.svg";
import imageBrand1 from "@assets/OrderSummary/image-brand-1.svg";
import imageBrand2 from "@assets/OrderSummary/image-brand-2.svg";
import imageBrand3 from "@assets/OrderSummary/image-brand-3.svg";
import imageBrand4 from "@assets/OrderSummary/image-brand-4.svg";
import { useLocation, useNavigate } from "react-router-dom";

const dataService = [
  {
    id: 1,
    label: "Secure Payment",
  },
  {
    id: 2,
    label: "Free Delivery",
  },
  {
    id: 3,
    label: "30 Days Easy Returns",
  },
];

const dataBrand = [
  { id: 1, image: imageBrand1 },
  { id: 2, image: imageBrand2 },
  { id: 3, image: imageBrand3 },
  { id: 4, image: imageBrand4 },
];

const OrderSummary = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[15px]">
      <h3 className="text-[18px] text-black font-semibold">Price Summary</h3>
      <div className="flex flex-col gap-[12px]">
        <div className="bg-[rgb(232,247,255)] rounded-[8px] px-[12px] py-[8px] flex gap-[8px]">
          <img src={iconCheck} />
          <p className="text-[12px] text-black">
            Standard Delivery by Fri, 16 Jun
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h5 className="text-[14px] text-[#667085]">Discount Code</h5>
          <div className="relative flex items-center">
            <input className="rounded-[12px] border-[1px] border-[#EAECF0] pl-[40px] pr-[12px] py-[12px] w-full" />
            <img src={iconDiscount} className="absolute left-[12px]" />
            <img className="absolute right-[12px]" src={iconTicketCircle} />
          </div>
          <div className="bg-[#F9FAFB] rounded-[8px] p-[16px] flex flex-col gap-[24px]">
            <div className="flex gap-[12px] text-[14px] flex-col">
              <div className="flex justify-between">
                <p>MRP</p>
                <p>$3025.59</p>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between">
                  <p>Net Price</p>
                  <p>$1775.59</p>
                </div>
                <div className="flex text-[#07828B] justify-between">
                  <p>Shipping Charges</p>
                  <p>$5.00</p>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <p>You need to pay (incl. taxes)</p>
                <p>$1775.59</p>
              </div>
            </div>
            {pathname.includes("cart") && (
              <button
                onClick={() => navigate("/checkout/address")}
                className="border-[1px] border-[#14C9C9] rounded-[12px] px-[16px] py-[10px] bg-[#E8FFFB] text-black font-semibold text-[14px]"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <ul className="flex justify-between list-disc text-[10px] text-[#98A2B3]">
            {dataService.map((item) => {
              return <li>{item.label}</li>;
            })}
          </ul>
          <div className="flex gap-[8px] items-start mt-[16px]">
            <img src={iconRotate} />
            <div className="flex-1">
              <p className="text-[12px] text-black">
                Easy returns: we accept returns within 30 days of purchase if
                product is unused.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-[24px] gap-[8px] flex-wrap">
            {dataBrand.map((item) => {
              return <img src={item.image} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
