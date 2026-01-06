import image1 from "@assets/Section6/image1.svg";
import image2 from "@assets/Section6/image2.svg";
import image3 from "@assets/Section6/image3.svg";
import image4 from "@assets/Blogs/image4.jpg";
import image5 from "@assets/Blogs/image5.jpg";
import image6 from "@assets/Blogs/image6.jpg";
import BlogItem from "@components/Ui/BlogItem";
import { Link } from "react-router-dom";

const dataSection6 = [
  {
    id: 1,
    image: image1,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    image: image2,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    image: image3,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    image: image4,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    image: image5,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
  {
    id: 6,
    image: image6,
    title: "My Dream Cycling Tour",
    des: "Where can I get some? Etiam risus diam, porttitor vitae ultrices quis, dapibus id dolor.Morbi venenatis lacinia rhoncus.Lorem ipsum dolor sit amet",
  },
];

const Section6 = () => {
  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[20px] justify-center items-center mx-auto xl:max-w-[1200px] lg:px-[100px] md:px-[50px] px-[10px] xl:px-0">
          <h1 className="md:text-[40px] text-[30px] font-semibold">
            Latest blog post
          </h1>
          <p className="text-[18px] text-[#667085] text-center">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 lg:gap-[18px] grid-cols-1 gap-[30px]">
          {dataSection6.map((item: any, _: any) => {
            return (
              <BlogItem
                id={item.id}
                title={item.title}
                image={item.image}
                des={item.des}
              />
            );
          })}
        </div>
        <div className="text-center">
          <Link
            className="text-[16px] text-white font-semibold rounded-[12px] px-[18px] py-[10px]  bg-[#14C9C9]"
            to={"/blog-list"}
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default Section6;
