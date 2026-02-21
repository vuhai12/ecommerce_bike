import CartProductItem from "./components/CartProductItem";
import image1 from "@assets/Checkout/image1.svg";
import image2 from "@assets/Checkout/image2.svg";
import ProductLayout from "../../layouts/ProductLayout";
import CheckoutSteps from "./components/CheckoutSteps";
import OrderSummary from "@components/OrderSummary";
import Recommendation from "@components/Recommendation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const listProductCarts = [
  {
    id: 1,
    image: image1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle",
    price: "$1249.99",
    color: "Warm Red",
  },
  {
    id: 2,
    image: image2,
    title: "EMotoraRYLAN Bicycle Helmet ",
    price: "$25.6",
    color: "Blue",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [productsInCart, setProductsInCart] = useState<
    {
      id: number;
      image: string;
      title: string;
      price: string;
      color: string;
    }[]
  >(listProductCarts);

  return (
    <ProductLayout>
      <div className="flex lg:flex-row flex-col gap-[50px] mt-[50px]">
        <div className="lg:w-[70%] w-full flex flex-col gap-[30px] flex-wrap">
          <CheckoutSteps />
          <div>
            {productsInCart.map((item) => {
              return (
                <CartProductItem
                  key={item.id}
                  setProductsInCart={setProductsInCart}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  color={item.color}
                  productsInCart={productsInCart}
                  id={item.id}
                />
              );
            })}
          </div>

          <div className="flex-col flex  w-full gap-[30px]">
            <div className="flex justify-between">
              <h3 className="text-[24px] text-black font-semibold">
                You may also like
              </h3>
              <p
                onClick={() => navigate("/product-list")}
                className="underline cursor-pointer text-[14px] text-[#14C9C9]"
              >
                View All
              </p>
            </div>
            <Recommendation />
          </div>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </ProductLayout>
  );
};

export default Checkout;
