import Radio from "@components/Radio";
import { useState } from "react";
import logo1 from "@assets/PaymentMethods/visa-logo.svg";
import logo2 from "@assets/PaymentMethods/Mastercard.svg";
import logo3 from "@assets/PaymentMethods/Maestro.svg";
import logo4 from "@assets/PaymentMethods/Discover.svg";
import logo5 from "@assets/PaymentMethods/Group.svg";
import logo6 from "@assets/PaymentMethods/ShopPay - Color 1.svg";
import logo7 from "@assets/PaymentMethods/Afterpay_logo.svg";
import PaymentFormCard from "./components/PaymentFormCard";
import CheckoutLayout from "../../layouts/CheckoutLayout";

const dataPaymentMethods = [
  {
    id: "1",
    label: "Credit card",
    name: "paymentMethods",
    logo: [logo1, logo2, logo3, logo4],
  },
  { id: "2", label: "Paypal", name: "paymentMethods", logo: [logo5] },
  { id: "3", label: "Shoppay", name: "paymentMethods", logo: [logo6] },
  { id: "4", label: "Afterpay", name: "paymentMethods", logo: [logo7] },
];

const PaymentMethods = () => {
  const [value, setValue] = useState("1");
  return (
    <CheckoutLayout>
      <div className="flex flex-col gap-[12px] mt-[30px]">
        {dataPaymentMethods.map((item) => {
          return (
            <div className="flex flex-col rounded-[12px] border-[#F2F4F7] border-[1px] p-[16px]">
              <label className="flex gap-[8px] flex-wrap">
                <Radio
                  setValue={setValue}
                  value={item.id}
                  checked={item.id == value}
                  name={item.name}
                />
                {item.id == "1" && (
                  <div className="flex justify-between flex-1 flex-wrap">
                    <p>{item.label}</p>
                    <div className="flex gap-[8px] items-center justify-center flex-wrap">
                      {item.logo.map((item: any) => {
                        return (
                          <div className="border-[1px] border-[#D0D5DD] rounded-[2px] w-[35px] h-[24px] flex items-center justify-center">
                            <img src={item} loading="lazy" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {item.id != "1" && <img src={item.logo[0]} />}
              </label>
              {value == item.id && <PaymentFormCard />}
            </div>
          );
        })}
      </div>
    </CheckoutLayout>
  );
};

export default PaymentMethods;
