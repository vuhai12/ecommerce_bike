import { useEffect, useState } from "react";
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

const dataListProducts = [
  {
    id: 1,
    title: "EMotorad X2 Unisex Mountain Electric Cycle",
    color: "green",
    price: "$310",
    image: image1,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
    des: "Unisex electric mountain bike with strong frame and powerful motor.",
  },
  {
    id: 2,
    title: "SHENGMILO MX05 Full Suspension Electric Mountain Bike",
    color: "green",
    price: "$520",
    image: image2,
    rate: "3",
    category: "Folding",
    tag: "Hot",
    des: "SHENGMILO MX05 is a full suspension electric mountain bike designed for challenging terrain, offering strong power, stability, and a smooth riding experience.",
  },
  {
    id: 3,
    title: "K9 Carbon / Mid‑drive Fat Tire Electric MTB",
    color: "green",
    price: "$350",
    image: image3,
    rate: "3",
    category: "Comfort",
    tag: "Hot",
    des: "K9 Carbon is a mid-drive fat tire electric mountain bike with a lightweight carbon frame, built for power, control, and off-road performance.",
  },
  {
    id: 4,
    title: "VDL Mountain Electric Bike for Adults, Fat Tire Ebike",
    color: "green",
    price: "$200",
    image: image4,
    rate: "3",
    category: "Folding",
    tag: "Hot",
    des: "VDL is a fat tire electric mountain bike for adults, designed for stable and powerful rides on all terrains.",
  },
  {
    id: 5,
    title: "Viribus Electric Mountain Fat Tirebike 26",
    color: "green",
    price: "$700",
    image: image5,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
    des: "Viribus is a 26-inch electric mountain bike with fat tires for stable off-road riding.",
  },
  {
    id: 6,
    title: "Santa Cruz Bullit Matte Cider",
    color: "green",
    price: "$320",
    image: image6,
    rate: "3",
    category: "Folding",
    tag: "Hot",
    des: "Santa Cruz Bullit is a high-performance electric mountain bike built for aggressive trails.",
  },
  {
    id: 7,
    title: "Amflow PL Carbon Pro eMTB",
    color: "green",
    price: "$310",
    image: image7,
    rate: "3",
    category: "Full Suspension",
    tag: "Hot",
    des: "Amflow PL Carbon Pro is a lightweight carbon eMTB built for fast, technical trails.",
  },
  {
    id: 8,
    title: "Specialized Turbo Levo Electric Mountain Bike",
    color: "green",
    price: "$360",
    image: image8,
    rate: "3",
    category: "Hunting/Fishing",
    tag: "Hot",
    des: "Specialized Turbo Levo delivers smooth power and confident control on any trail.",
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

const ProductDetail = () => {
  const [colorPicked, setColorPicked] = useState<string>("Warm Green");
  const [imagePicked, setImagePiked] = useState(
    thumbnailImagesData[0].images[0].image
  );

  const { id } = useParams();
  const productItem = dataListProducts.find((item) => String(item.id) == id);
  const navigate = useNavigate();
  useEffect(() => {
    const dataFilter = thumbnailImagesData.filter(
      (item) => item.color == colorPicked
    );
    if (dataFilter.length > 0) {
      setImagePiked(dataFilter[0].images[0].image);
    }
  }, [colorPicked]);
  return (
    <ProductLayout>
      <div className="flex lg:gap-[50px] lg:flex-row flex-col gap-[20px]">
        <div className="flex-1">
          {thumbnailImagesData.map((item, _) => {
            return (
              <>
                {colorPicked == item.color && (
                  <ThumbnailImages
                    listImage={item.images}
                    imagePicked={imagePicked}
                    setImagePiked={setImagePiked}
                  />
                )}
              </>
            );
          })}
        </div>
        <div className="flex-1 flex flex-col gap-[20px]">
          <h1 className="text-[40px] font-semibold text-black">
            {productItem?.title}
          </h1>
          <p className="text-[16px] text-[#23272F]">{productItem?.des}</p>
          <p className="text-[30px]">{productItem?.price}</p>
          <p className="text-[16px]">
            <span className="text-[#667085]">Colour: </span>
            <span className="text-[#23272F] font-semibold">{colorPicked}</span>
          </p>
          <div className="flex gap-[16px] flex-wrap">
            {thumbnailImagesData.map((item, _) => {
              return (
                <RadioPickColor
                  image={item.imageColor}
                  price={item.price}
                  colorPick={item.color}
                  setColorPicked={setColorPicked}
                  colorPicked={colorPicked}
                />
              );
            })}
          </div>

          <div className="flex gap-[16px] flex-wrap">
            <button className="flex flex-1 justify-center gap-[8px] items-center px-[18px] py-[10px] rounded-[12px] font-semibold border-[#D0D5DD] border-[1px] text-[16px] text-black">
              <img
                src={iconCart}
                alt="iconCart"
                className="w-[20px] h-[20px]"
              />
              <p>Add to cart</p>
            </button>
            <button
              onClick={() => navigate(`/cart`)}
              className="flex flex-1 justify-center items-center gap-[8px] px-[18px] py-[10px] rounded-[12px] bg-[#14C9C9] text-[16px] font-semibold text-white"
            >
              <img
                src={iconFlash}
                alt="iconCart"
                className="w-[20px] h-[20px]"
              />
              <p>Quick buy</p>
            </button>
          </div>
          <div className="flex justify-between w-full flex-wrap gap-[10px]">
            {featureHighlights.map((item, _) => {
              return (
                <div className="flex flex-col text-center text-[#667085] text-[14px] gap-[12px] items-center justify-center">
                  <img src={item.icon} className="w-[40px] h-[40px]" />
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <BoughtTogether />
      <Section3 />
      <Section4 />
      <Section5 />
      <div className="flex flex-col gap-[20px]">
        <h3 className="text-[#23272F] font-semibold text-[24px]">
          Recommended for you
        </h3>
        <Recommendation />
      </div>

      <Section7 />
    </ProductLayout>
  );
};

export default ProductDetail;
