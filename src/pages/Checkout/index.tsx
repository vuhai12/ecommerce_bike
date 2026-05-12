import CartProductItem from "./components/CartProductItem";
import ProductLayout from "../../layouts/ProductLayout";
import OrderSummary from "@components/OrderSummary";
import { useEffect } from "react";
import { getCartThunk } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import CartProductItemSkeleton from "@components/CartProductItemSkeleton";
import OrderSummarySkeleton from "@components/OrderSummarySkeleton";

const Checkout = () => {
  const dispatch = useAppDispatch();

  const {
    cart: cartData,
    loading,
    error,
  } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");

    if (cartId) {
      dispatch(getCartThunk(cartId));
    }
  }, [dispatch]);

  if (error) {
    return (
      <ProductLayout>
        <div className="flex items-center justify-center min-h-[500px] px-4">
          <div className="w-full max-w-[500px] rounded-[24px] border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-[18px] font-semibold text-red-500">{error}</p>
          </div>
        </div>
      </ProductLayout>
    );
  }

  if (loading) {
    return (
      <ProductLayout>
        <div className="flex lg:flex-row flex-col gap-[30px] mt-[30px] p-[20px]">
          <div className="lg:w-[70%] w-full flex flex-col gap-[30px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <CartProductItemSkeleton key={index} />
            ))}
          </div>

          <div className="lg:w-[30%] w-full">
            <OrderSummarySkeleton />
          </div>
        </div>
      </ProductLayout>
    );
  }

  const isCartEmpty =
    !cartData || !cartData.lines || cartData.lines.nodes.length === 0;

  if (isCartEmpty) {
    return (
      <ProductLayout>
        <div className="w-full bg-white">
          <div className="flex flex-col items-center justify-center px-4 mt-[50px] text-center">
            <h1 className="text-[30px] font-[700] uppercase tracking-[1px] text-[#222222] md:text-[34px]">
              Shopping Cart
            </h1>

            <div className="mt-[50px] flex h-[140px] w-[140px] items-center justify-center">
              <ShoppingCart
                size={120}
                strokeWidth={1.8}
                className="text-[#14c9c9]"
              />
            </div>

            <h2 className="mt-10 text-[34px] font-[700] leading-[1.3] text-[#2B2B2B] md:text-[42px]">
              Your Cart Is Currently Empty!
            </h2>

            <p className="mt-6 max-w-[620px] text-[14px] leading-[28px] text-[#9A9A9A]">
              Before proceed to checkout you must add some products to your
              shopping cart.
              <br />
              You will find a lot of interesting products on our "Shop" page.
            </p>

            <Link
              to="/product-list"
              className="mt-10 inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#14c9c9] px-8 py-4 text-[14px] font-[600] text-white transition hover:bg-[#060c52]"
            >
              Return To Shop
            </Link>
          </div>
        </div>
      </ProductLayout>
    );
  }

  const totalAmount = cartData.cost?.totalAmount?.amount || "0";
  const currencyCode = cartData.cost?.totalAmount?.currencyCode || "USD";

  return (
    <ProductLayout>
      <div className="flex lg:flex-row flex-col gap-[30px] mt-[30px] p-[20px]">
        <div className="lg:w-[70%] w-full flex flex-col gap-[30px]">
          {cartData.lines.nodes.map((item) => {
            return (
              <CartProductItem
                key={item.id}
                title={item.merchandise.product.title}
                image={item.merchandise.product.featuredImage?.url || ""}
                price={item.merchandise.price?.amount || "0"}
                id={item.id}
                quantity={item.quantity}
              />
            );
          })}
        </div>

        <div className="border-[1px] border-gray-200 rounded-2xl p-[20px] lg:w-[30%]">
          <OrderSummary
            totalAmount={totalAmount}
            currencyCode={currencyCode}
            checkoutUrl={cartData.checkoutUrl}
          />
        </div>
      </div>
    </ProductLayout>
  );
};

export default Checkout;
