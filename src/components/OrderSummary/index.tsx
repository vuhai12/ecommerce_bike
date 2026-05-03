import iconRotate from "@assets/OrderSummary/icon-rotate-right.svg";
import imageBrand1 from "@assets/OrderSummary/image-brand-1.svg";
import imageBrand2 from "@assets/OrderSummary/image-brand-2.svg";
import imageBrand3 from "@assets/OrderSummary/image-brand-3.svg";
import imageBrand4 from "@assets/OrderSummary/image-brand-4.svg";
import { useLocation } from "react-router-dom";

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

const OrderSummary = ({
  totalAmount,
  checkoutUrl,
}: {
  totalAmount: string;
  currencyCode: string;
  checkoutUrl: string;
}) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-[15px]">
      <h3 className="text-[18px] text-black font-semibold">Price Summary</h3>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[10px]">
          <div className="bg-[#f4f4f5] rounded-[10px] p-[20px] flex flex-col gap-[24px]">
            <div className="flex gap-[12px] text-[14px] flex-col">
              <div className="flex justify-between">
                <p>MRP</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between">
                  <p>Net Price</p>
                  <p>${totalAmount}</p>
                </div>
                {/* <div className="flex text-[#07828B] justify-between">
                  <p>Shipping Charges</p>
                  <p>$5.00</p>
                </div> */}
              </div>
              <div className="flex justify-between font-semibold">
                <p>You need to pay (incl. taxes)</p>
                <p>${totalAmount}</p>
              </div>
            </div>
            {pathname.includes("cart") && (
              <button
                onClick={() => {
                  if (!checkoutUrl) return;
                  window.location.href = checkoutUrl;
                }}
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
              return <li key={item.id}>{item.label}</li>;
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
              return <img key={item.id} src={item.image} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
