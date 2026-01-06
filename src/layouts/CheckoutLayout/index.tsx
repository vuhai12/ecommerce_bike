import OrderSummary from "@components/OrderSummary";
import CheckoutSteps from "@pages/Checkout/components/CheckoutSteps";
import ProductLayout from "../ProductLayout";
import { ReactNode } from "react";

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProductLayout>
      <div className="flex gap-[50px] lg:flex-row flex-col">
        <div className="flex-[3]">
          <CheckoutSteps />
          {children}
        </div>
        <div className="flex-1">
          <OrderSummary />
        </div>
      </div>
    </ProductLayout>
  );
};

export default CheckoutLayout;
