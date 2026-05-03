import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import iconCart from "@assets/ProductDetail/icon-cart.svg";
import iconFlash from "@assets/ProductDetail/icon-flash.svg";
import iconCup from "@assets/ProductDetail/icon-cup.svg";
import iconStar from "@assets/ProductDetail/icon-star.svg";
import iconSecure from "@assets/ProductDetail/icon-secure.svg";
import iconTruck from "@assets/ProductDetail/icon-truck.svg";
import iconRote from "@assets/ProductDetail/icon-rote.svg";

import ProductLayout from "../../layouts/ProductLayout";
import ThumbnailImages from "./components/ThumbnailImages";
import BoughtTogether from "./components/BoughtTogether";
import Section3 from "../ProductDetail/components/Section3";
import Section4 from "../ProductDetail/components/Section4";
import Section7 from "./components/Section7";
import Recommendation from "@components/Recommendation";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProductDetail } from "../../features/productDetail/productDetailSlice";
import { addCartThunk } from "../../features/cart/cartSlice";
import ProductDetailSkeleton from "@components/ProductDetailSkeleton";
import ReviewSection from "@components/ReviewSection";

/* ================= DATA ================= */

const featureHighlights = [
  { id: 1, icon: iconCup, name: "Top Brand" },
  { id: 2, icon: iconStar, name: "2 Year Warranty" },
  { id: 3, icon: iconSecure, name: "Secure Transaction" },
  { id: 4, icon: iconTruck, name: "Free Shipping" },
  { id: 5, icon: iconRote, name: "10 Days Replacement" },
];

/* ================= COMPONENT ================= */

const ProductDetail = () => {
  const { handle } = useParams();
  const dispatch = useAppDispatch();
  const [imagePicked, setImagePicked] = useState<number>(0);
  const [listChecked, setListChecked] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data, loading, error } = useAppSelector(
    (state) => state.productDetail,
  );

  const { summary, error: reviewError } = useAppSelector(
    (state) => state.reviews,
  );

  useEffect(() => {
    if (!handle) return;

    dispatch(fetchProductDetail(handle));
  }, [dispatch, handle]);

  const handleAddCart = async () => {
    const cartId = localStorage.getItem("shopify_cart_id");
    const bikeVariantId = data?.variants?.[0]?.id;

    if (!bikeVariantId) return;

    const selectedAccessoryLines =
      data?.accessories
        ?.filter((item: any) => listChecked.includes(item.variant?.id))
        .map((item: any) => ({
          merchandiseId: item.variant.id,
          quantity: 1,
        })) || [];

    const lines = [
      {
        merchandiseId: bikeVariantId,
        quantity: 1,
      },
      ...selectedAccessoryLines,
    ];

    const resultAction = await dispatch(
      addCartThunk({
        cartId,
        lines,
      }),
    );

    if (addCartThunk.fulfilled.match(resultAction)) {
      const result = resultAction.payload;

      if (result?.cartId) {
        localStorage.setItem("shopify_cart_id", result.cartId);
      }
    }
  };
  const averageStars = useMemo(() => {
    const rounded = Math.round(summary.averageRating || 0);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }, [summary.averageRating]);

  if (loading) {
    return (
      <ProductLayout>
        <ProductDetailSkeleton />
      </ProductLayout>
    );
  }

  return (
    <ProductLayout>
      <div className="container px-4 sm:px-6 lg:px-0 py-[50px] overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 "
          >
            <ThumbnailImages
              listImage={data?.images || []}
              imagePicked={imagePicked}
              setImagePiked={setImagePicked}
            />
          </motion.div>

          {/* RIGHT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col gap-6 "
          >
            <h1 className="text-[20px] sm:text-[25px] font-semibold">
              {data?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-[16px] font-extrabold md:text-[20px]">
                {summary.averageRating?.toFixed?.(1) || "0.0"}
              </div>

              <div className="flex gap-[10px] items-center">
                <div className="text-2xl tracking-wider text-amber-400">
                  {averageStars}
                </div>
                <div className="mt-1 text-sm  text-gray-500">
                  ({summary.reviewCount} reviews)
                </div>
              </div>
            </div>

            <p className="sm:text-[20px] text-[18px] font-semibold text-[#23272F]">
              ${data?.price}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddCart}
                className="flex-1 justify-center items-center px-5 py-3 rounded-xl border border-gray-300 font-semibold"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex gap-2 items-center justify-center"
                >
                  <img src={iconCart} className="w-5 h-5" />
                  Add to cart
                </motion.div>
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="flex flex-1 justify-center gap-2 items-center px-5 py-3 rounded-xl bg-[#14C9C9] text-white font-semibold"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex gap-2 items-center justify-center"
                >
                  <img src={iconFlash} className="w-5 h-5" />
                  Quick buy
                </motion.div>
              </button>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-4">
              {featureHighlights.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center text-sm text-gray-500 gap-2"
                >
                  <img src={item.icon} className="w-8 h-8" />
                  <p className="text-[15px]">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="px-4 lg:px-0 flex flex-col gap-[20px]">
        <BoughtTogether
          accessories={data?.accessories}
          listChecked={listChecked}
          setListChecked={setListChecked}
        />
        <Section3 />
        <Section4 description={data?.descriptionHtml} />
        {/* <Section5 /> */}
        <ReviewSection productHandle={handle || ""} />
      </div>

      <div className="container overflow-hidden px-4 sm:px-6 lg:px-0 ">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6">
          Recommended for you
        </h3>
        <Recommendation />
      </div>

      <Section7 />
    </ProductLayout>
  );
};

export default ProductDetail;
