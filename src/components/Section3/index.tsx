import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProductItem from "@components/Ui/ProductItem";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productSlice";

const tabDatas = [
  {
    id: "best-seller",
    lable: "Select.best-seller",
  },
  {
    id: "new-arrival",
    lable: "Select.new-arrival",
  },
];

const Section3 = () => {
  const [activeTab, setActiveTab] = useState("best-seller");
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { list: activeProducts, loading } = useAppSelector(
    (state) => state.products,
  );

  const fetchProductsByTab = () => {
    dispatch(fetchProducts({ collectionHandle: "comfort", tabKey: activeTab }));
  };

  useEffect(() => {
    fetchProductsByTab();
  }, [activeTab]);

  return (
    <section className="py-5 px-4 container">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-[800px] mx-auto "
      >
        <h1 className="md:text-[40px] font-semibold text-[30px] mb-[20px]">
          <span className="text-black">
            {t("HeadingSection3.title.AnEbikefor")}{" "}
          </span>
          <span className="text-[#14C9C9]">
            {t("HeadingSection3.title.Every")}{" "}
          </span>
          <span className="text-black">
            {t("HeadingSection3.title.Typeof")}{" "}
          </span>
          <span className="text-[#14C9C9]">
            {t("HeadingSection3.title.Rider")}
          </span>
        </h1>
        <p className="text-[18px] text-[#667085]">{t("HeadingSection3.des")}</p>
      </motion.div>

      {/* TABS WITH SLIDE INDICATOR */}
      <div className="relative mt-16 flex bg-[#eceff0] p-2 rounded-xl">
        {tabDatas.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex-1 text-center py-2 cursor-pointer z-10"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-[#14C9C9] rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={classNames(
                "relative font-medium",
                activeTab === tab.id ? "text-white" : "text-[#667085]",
              )}
            >
              {t(tab.lable)}
            </span>
          </div>
        ))}
      </div>

      {/* PRODUCTS ANIMATION WHEN SWITCH TAB */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* IMAGE */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* TITLE */}
                <div className="relative h-5 w-3/4 bg-gray-200 rounded overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>

                {/* PRICE */}
                <div className="relative h-6 w-1/2 bg-gray-200 rounded overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >
            {activeProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ProductItem
                  handle={product.handle}
                  title={product.title}
                  price={product.price}
                  averageRating={product.averageRating}
                  reviewCount={product.reviewCount}
                  image={product.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
      {/* VIEW ALL */}
      <div className="text-center mt-10">
        <Link
          to="/product-list"
          className="px-6 py-3 bg-[#14C9C9] text-white rounded-xl font-semibold"
        >
          {t("HeadingSection3.ViewAll")}
        </Link>
      </div>
    </section>
  );
};

export default Section3;
