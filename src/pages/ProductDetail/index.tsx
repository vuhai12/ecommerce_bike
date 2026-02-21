import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import iconCart from "@assets/ProductDetail/icon-cart.svg";
import iconFlash from "@assets/ProductDetail/icon-flash.svg";
import iconCup from "@assets/ProductDetail/icon-cup.svg";
import iconStar from "@assets/ProductDetail/icon-star.svg";
import iconSecure from "@assets/ProductDetail/icon-secure.svg";
import iconTruck from "@assets/ProductDetail/icon-truck.svg";
import iconRote from "@assets/ProductDetail/icon-rote.svg";
import imageGreen1 from "@assets/ProductDetail/image-green-1.webp";
import imageGreen2 from "@assets/ProductDetail/image-green-2.webp";
import imageGreen3 from "@assets/ProductDetail/image-green-3.webp";
import imageGreen4 from "@assets/ProductDetail/image-green-4.webp";
import imageGreen5 from "@assets/ProductDetail/image-green-5.jpeg";
import imageRed1 from "@assets/ProductDetail/image-red-1.webp";
import imageRed2 from "@assets/ProductDetail/image-red-2.webp";
import imageRed3 from "@assets/ProductDetail/image-red-3.jpeg";
import imageRed4 from "@assets/ProductDetail/image-red-4.webp";
import imageRed5 from "@assets/ProductDetail/image-red-5.webp";
import ProductLayout from "../../layouts/ProductLayout";
import RadioPickColor from "./components/RadioPickColor";
import ThumbnailImages from "./components/ThumbnailImages";
import BoughtTogether from "./components/BoughtTogether";
import Section3 from "../ProductDetail/components/Section3";
import Section4 from "../ProductDetail/components/Section4";
import Section5 from "../ProductDetail/components/Section5";
import Section7 from "./components/Section7";
import Recommendation from "@components/Recommendation";
import { useNavigate, useParams } from "react-router-dom";

import image1 from "@assets/ProductList/Main/image1.svg";
import image2 from "@assets/ProductList/Main/image2.svg";
import image3 from "@assets/ProductList/Main/image3.svg";
import image4 from "@assets/ProductList/Main/image4.svg";
import image5 from "@assets/ProductList/Main/image5.svg";
import image6 from "@assets/ProductList/Main/image6.svg";
import image7 from "@assets/ProductList/Main/image7.svg";
import image8 from "@assets/ProductList/Main/image8.svg";

/* ================= DATA ================= */

const dataListProducts = [
  {
    id: 1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle",
    price: "$310",
    image: image1,
    des: "Unisex electric mountain bike with strong frame and powerful motor.",
  },
  {
    id: 2,
    title: "SHENGMILO MX05 Full Suspension Electric Mountain Bike",
    price: "$520",
    image: image2,
    des: "Full suspension electric mountain bike designed for challenging terrain.",
  },
  {
    id: 3,
    title: "K9 Carbon / Mid-drive Fat Tire Electric MTB",
    price: "$350",
    image: image3,
    des: "Mid-drive fat tire electric mountain bike with lightweight carbon frame.",
  },
  {
    id: 4,
    title: "VDL Mountain Electric Bike for Adults",
    price: "$200",
    image: image4,
    des: "Fat tire electric mountain bike for stable rides.",
  },
  {
    id: 5,
    title: "Viribus Electric Mountain Fat Tirebike 26",
    price: "$700",
    image: image5,
    des: "26-inch electric mountain bike with fat tires.",
  },
  {
    id: 6,
    title: "Santa Cruz Bullit Matte Cider",
    price: "$320",
    image: image6,
    des: "High-performance electric mountain bike.",
  },
  {
    id: 7,
    title: "Amflow PL Carbon Pro eMTB",
    price: "$310",
    image: image7,
    des: "Lightweight carbon eMTB built for technical trails.",
  },
  {
    id: 8,
    title: "Specialized Turbo Levo Electric Mountain Bike",
    price: "$360",
    image: image8,
    des: "Smooth power and confident control on any trail.",
  },
];

const featureHighlights = [
  { id: 1, icon: iconCup, name: "Top Brand" },
  { id: 2, icon: iconStar, name: "2 Year Warranty" },
  { id: 3, icon: iconSecure, name: "Secure Transaction" },
  { id: 4, icon: iconTruck, name: "Free Shipping" },
  { id: 5, icon: iconRote, name: "10 Days Replacement" },
];

const thumbnailImagesData = [
  {
    id: 1,
    color: "Warm Green",
    price: "$999",
    imageColor: imageGreen1,
    images: [
      { id: 1, image: imageGreen1 },
      { id: 2, image: imageGreen2 },
      { id: 3, image: imageGreen3 },
      { id: 4, image: imageGreen4 },
      { id: 5, image: imageGreen5 },
    ],
  },
  {
    id: 2,
    color: "Warm Red",
    price: "$888",
    imageColor: imageRed1,
    images: [
      { id: 1, image: imageRed1 },
      { id: 2, image: imageRed2 },
      { id: 3, image: imageRed3 },
      { id: 4, image: imageRed4 },
      { id: 5, image: imageRed5 },
    ],
  },
];

/* ================= COMPONENT ================= */

const ProductDetail = () => {
  const [colorPicked, setColorPicked] = useState("Warm Green");
  const [imagePicked, setImagePicked] = useState(
    thumbnailImagesData[0].images[0].image,
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const productItem = dataListProducts.find((item) => String(item.id) === id);

  useEffect(() => {
    const found = thumbnailImagesData.find(
      (item) => item.color === colorPicked,
    );
    if (found) setImagePicked(found.images[0].image);
  }, [colorPicked]);

  return (
    <ProductLayout>
      <div className="container px-4 sm:px-6 lg:px-0 py-12 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* LEFT IMAGE */}
          <motion.div
            key={colorPicked}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            {thumbnailImagesData.map((item) =>
              colorPicked === item.color ? (
                <ThumbnailImages
                  key={item.id}
                  listImage={item.images}
                  imagePicked={imagePicked}
                  setImagePiked={setImagePicked}
                />
              ) : null,
            )}
          </motion.div>

          {/* RIGHT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {productItem?.title}
            </h1>

            <p className="text-sm sm:text-base text-[#23272F]">
              {productItem?.des}
            </p>

            <p className="text-2xl sm:text-3xl font-semibold">
              {productItem?.price}
            </p>

            <p>
              <span className="text-gray-500">Colour: </span>
              <span className="font-semibold">{colorPicked}</span>
            </p>

            <div className="flex gap-4 flex-wrap">
              {thumbnailImagesData.map((item) => (
                <RadioPickColor
                  key={item.id}
                  image={item.imageColor}
                  price={item.price}
                  colorPick={item.color}
                  setColorPicked={setColorPicked}
                  colorPicked={colorPicked}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center gap-2 items-center px-5 py-3 rounded-xl border border-gray-300 font-semibold"
              >
                <img src={iconCart} className="w-5 h-5" />
                Add to cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/cart")}
                className="flex justify-center gap-2 items-center px-5 py-3 rounded-xl bg-[#14C9C9] text-white font-semibold"
              >
                <img src={iconFlash} className="w-5 h-5" />
                Quick buy
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-4">
              {featureHighlights.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center text-sm text-gray-500 gap-2"
                >
                  <img src={item.icon} className="w-8 h-8" />
                  <p>{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="px-4 lg:px-0 flex flex-col gap-[20px]">
        <BoughtTogether />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>

      <div className="container overflow-hidden px-4 sm:px-6 lg:px-0 py-12 ">
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
