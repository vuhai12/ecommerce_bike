import { useEffect, useState } from "react";

import image1 from "@assets/Section3/image1.svg";
import image2 from "@assets/Section3/image2.svg";
import image3 from "@assets/Section3/image3.svg";
import image4 from "@assets/Section3/image4.svg";
import image5 from "@assets/Section3/image5.svg";
import image6 from "@assets/Section3/image6.svg";
import image7 from "@assets/Section3/image7.svg";
import image8 from "@assets/Section3/image8.svg";
import iconArraw from "@assets/Section3/icon-arrow-up-right.svg";
import Checkbox from "@components/Checkbox";
import classNames from "classnames";
import ProductItem from "@components/Ui/ProductItem";
import { Link, useNavigate } from "react-router-dom";

const dataSection3 = [
  { id: 1, image: image1, title: "Montra", des: "Bicycles" },
  { id: 2, image: image2, title: "Btwin", des: "Bicycles" },
  { id: 3, image: image3, title: "Trek", des: "Bicycles" },
  { id: 4, image: image4, title: "Giant", des: "Bicycles" },
];

const dataCategories = [
  { id: 1, value: "Comfort" },
  { id: 2, value: "Folding" },
  { id: 3, value: "Light Trail" },
  { id: 4, value: "Hunting/Fishing" },
  { id: 5, value: "Full Suspension" },
];

const tabDatas = [
  {
    id: 1,
    lable: "Best Sellers",
    products: [
      {
        id: 1,
        category: "Comfort",
        title: "ECO BIKE MAX - India’s Best Value for Money E-Cycle",
        price: "$599.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image1,
      },
      {
        id: 2,
        category: "Comfort",
        title: "ECO BIKE PRO - The Grand e-xperience",
        price: "$2358.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image2,
      },
      {
        id: 3,
        category: "Comfort",
        title: "ECO BIKE LIT - Go further, faster, longer",
        price: "$1256.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image3,
      },
      {
        id: 4,
        category: "Comfort",
        title: "HASHTAG ELECTRIC - Ride to Paradise",
        price: "$895.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image4,
      },
      {
        id: 5,
        category: "Comfort",
        title: "EMotorad T-Rex Plus w/o Suspension Lockout",
        price: "$689.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image5,
      },
      {
        id: 6,
        category: "Comfort",
        title: "Firefox Adventron 27.5 Electric Bike",
        price: "$1009.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image6,
      },
      {
        id: 7,
        category: "Comfort",
        title: "Bianchi T-Tronik C Type - Sunrace (2023)",
        price: "$2048.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image7,
      },
      {
        id: 8,
        category: "Comfort",
        title: "Bianchi Vertic T Type - Step Through - Altus/X5 (2023)",
        price: "$956.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
    ],
  },
  {
    id: 2,
    lable: "New Arrival",
    products: [
      {
        id: 9,
        category: "Comfort",
        title: "ECO BIKE MAX - India’s Best Value for Money E-Cycle",
        price: "$599.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 10,
        category: "Comfort",
        title: "ECO BIKE PRO - The Grand e-xperience",
        price: "$2358.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 11,
        category: "Comfort",
        title: "ECO BIKE LIT - Go further, faster, longer",
        price: "$1256.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 12,
        category: "Comfort",
        title: "HASHTAG ELECTRIC - Ride to Paradise",
        price: "$895.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 13,
        category: "Comfort",
        title: "EMotorad T-Rex Plus w/o Suspension Lockout",
        price: "$689.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 14,
        category: "Comfort",
        title: "Firefox Adventron 27.5 Electric Bike",
        price: "$1009.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 15,
        category: "Comfort",
        title: "Bianchi T-Tronik C Type - Sunrace (2023)",
        price: "$2048.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 16,
        category: "Comfort",
        title: "Bianchi Vertic T Type - Step Through - Altus/X5 (2023)",
        price: "$956.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
      {
        id: 17,
        category: "Comfort",
        title: "ECO BIKE MAX - India’s Best Value for Money E-Cycle",
        price: "$599.99",
        rating: "5",
        sold: "3000",
        badge: "New",
        image: image8,
      },
    ],
  },
];

const Section3 = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState<any>([]);
  const navigate = useNavigate();
  const handleChangeTab = (tabData: any) => {
    setActiveTab(tabData.id);
    setProducts(tabData.products);
  };
  useEffect(() => {
    setProducts([...tabDatas[0].products]);
  }, []);

  const [listChecked, setListChecked] = useState<number[]>([]);

  return (
    <>
      <div className="">
        <div className="flex gap-[20px] flex-col mb-[120px] items-center mx-auto max-w-[900px]">
          <h1 className="md:text-[40px] text-[20px] text-black">
            An Ebike for Every Type of Rider
          </h1>
          <p className="text-[18px] text-[#667085] text-center">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
        <div className="flex lg:gap-[20px] lg:flex-row flex-col gap-[80px]">
          {dataSection3.map((item, _) => {
            return (
              <div
                key={item.id}
                className="flex-1 relative p-[20px] flex gap-[20px] items-center flex-col bg-gradient-to-b from-[#F9FAFB]/50 to-[#F9FAFB]/100 rounded-[16px]"
              >
                <img
                  src={item.image}
                  alt="image"
                  className="absolute top-0 -translate-y-[50%]"
                />
                <h5 className="text-[30px] text-[#23272F] font-semibold mt-[80px]">
                  {item.title}
                </h5>
                <p className="text-[16px] text-[#667085]">{item.des}</p>
                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="flex gap-[5px] bg-[#14C9C9] px-[20px] py-[10px] rounded-[10px] text-white"
                >
                  <p>Explore</p>
                  <img src={iconArraw} alt="iconArraw" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-[48px] flex flex-wrap gap-[8px] p-[6px] rounded-[10px] text-[#909aaa] bg-[#eceff0]">
          {tabDatas.map((tabData, _) => {
            return (
              <div
                key={tabData.id}
                className={classNames(
                  "flex-1 cursor-pointer text-center px-[14px] py-[10px]  rounded-[11px]",
                  activeTab == tabData.id && "bg-[#14C9C9] text-white"
                )}
                onClick={() => handleChangeTab(tabData)}
              >
                {tabData.lable}
              </div>
            );
          })}
        </div>
        <div className="flex gap-[20px] mt-[20px] lg:flex-row flex-col">
          {dataCategories.map((dataCategory, _) => {
            return (
              <label
                key={dataCategory.id}
                className="flex flex-1 cursor-pointer gap-[6px] p-[8px] bg-[#F9FAFB] rounded-[12px] flex-wrap"
              >
                <Checkbox
                  listChecked={listChecked}
                  setListChecked={setListChecked}
                  value={dataCategory.id}
                  label={dataCategory.value}
                />
              </label>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-4 lg:gap-[20px] grid-cols-1 gap-[30px] mt-[20px]">
          {products.map((product: any, _: any) => {
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                rate="88"
                quantity="100"
                image={product.image}
              />
            );
          })}
        </div>
        <div className="text-center mt-[30px]">
          <Link
            className="px-[18px] text-[16px] py-[10px] font-semibold bg-[#14C9C9] rounded-[12px] text-white"
            to={"/product-list"}
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default Section3;
