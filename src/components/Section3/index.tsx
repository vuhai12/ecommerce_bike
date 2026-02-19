import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "@assets/Section3/image1.svg";
import image2 from "@assets/Section3/image2.svg";
import image3 from "@assets/Section3/image3.svg";
import image4 from "@assets/Section3/image4.svg";
import image5 from "@assets/Section3/image5.svg";
import image6 from "@assets/Section3/image6.svg";
import image7 from "@assets/Section3/image7.svg";
import image8 from "@assets/Section3/image8.svg";
import iconArraw from "@assets/Section3/icon-arrow-up-right.svg";
import ProductItem from "@components/Ui/ProductItem";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

const dataSection3 = [
  { id: 1, image: image1, title: "Montra", des: "Bicycles" },
  { id: 2, image: image2, title: "Btwin", des: "Bicycles" },
  { id: 3, image: image3, title: "Trek", des: "Bicycles" },
  { id: 4, image: image4, title: "Giant", des: "Bicycles" },
];

const tabDatas = [
  {
    id: 1,
    lable: "Best Sellers",
    products: [
      { id: 1, title: "ECO BIKE MAX", price: "$599.99", image: image1 },
      { id: 2, title: "ECO BIKE PRO", price: "$2358.99", image: image2 },
      { id: 3, title: "ECO BIKE LIT", price: "$1256.99", image: image3 },
      { id: 4, title: "HASHTAG ELECTRIC", price: "$895.99", image: image4 },
    ],
  },
  {
    id: 2,
    lable: "New Arrival",
    products: [
      { id: 9, title: "New Bike 1", price: "$599.99", image: image8 },
      { id: 10, title: "New Bike 2", price: "$2358.99", image: image8 },
      { id: 11, title: "New Bike 3", price: "$1256.99", image: image8 },
      { id: 12, title: "New Bike 4", price: "$895.99", image: image8 },
    ],
  },
];

const Section3 = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const activeProducts =
    tabDatas.find((tab) => tab.id === activeTab)?.products || [];

  return (
    <section className="py-5 px-4 container">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-[800px] mx-auto mb-[120px] "
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ">
          An Ebike for Every Type of Rider
        </h1>
      </motion.div>

      {/* BRAND CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dataSection3.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative p-6 bg-gradient-to-b from-[#F9FAFB]/50 to-[#F9FAFB] rounded-2xl text-center"
          >
            <img
              src={item.image}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <h5 className="text-xl font-semibold mt-14">{item.title}</h5>
            <p className="text-[#667085]">{item.des}</p>

            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="mt-4 inline-flex items-center gap-2 bg-[#14C9C9] px-4 py-2 rounded-lg text-white"
            >
              Explore
              <img src={iconArraw} />
            </button>
          </motion.div>
        ))}
      </div>

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
              {tab.lable}
            </span>
          </div>
        ))}
      </div>

      {/* PRODUCTS ANIMATION WHEN SWITCH TAB */}
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
                id={product.id}
                title={product.title}
                price={product.price}
                rate="88"
                quantity="100"
                image={product.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* VIEW ALL */}
      <div className="text-center mt-10">
        <Link
          to="/product-list"
          className="px-6 py-3 bg-[#14C9C9] text-white rounded-xl font-semibold"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default Section3;
