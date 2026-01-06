import RecentBlogs from "@components/RecentBlogs";
import MainLayout from "../../layouts/MainLayout";
import image1 from "@assets/Blogs/image1.svg";
import image2 from "@assets/Blogs/image2.svg";
import image3 from "@assets/Blogs/image3.svg";

import { ArrowUpRight } from "lucide-react";
import Pagination from "@components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";

const dataBlogs = [
  {
    id: 1,
    image: image1,
    title: "My Dream Cycling Tour",
    des: `My dream cycling tour is about exploring new places at my own pace.
Riding through long roads, small towns, and beautiful landscapes brings a special sense of freedom.

Every journey is a mix of challenge and joy, with moments to stop, breathe, and enjoy the view.
A cycling tour is not just about the destination, but about every mile along the way.`,
  },
  {
    id: 2,
    image: image2,
    title: "Best Cycling Accessories",
    des: `Having the right cycling accessories can make every ride safer, more comfortable, and more enjoyable.
From helmets and gloves to lights and repair kits, each accessory plays an important role on the road.

Good lighting improves visibility at night, while padded gloves reduce fatigue on long rides.
With the right accessories, cycling becomes not just a sport, but a smooth and confident experience.`,
  },
  {
    id: 3,
    image: image3,
    title: "Cycling through The Night",
    des: `When the city falls asleep, cycling through the night feels different.
The streets are quiet, the air is cool, and every pedal stroke is calming.

Streetlights guide the way, and the silence creates space to think and breathe.
Night cycling is not just a ride — it is a moment of freedom.`,
  },
];

const BlogList = () => {
  const [pageCurrent, setPageCurrent] = useState(1);
  return (
    <MainLayout>
      <div className="flex md:flex-row flex-col gap-[20px]  mt-[30px]">
        <div className="flex-[3] flex flex-col items-center gap-[30px]">
          <div className="grid sm:grid-cols-3 gap-[20px] grid-cols-1">
            {dataBlogs.map((item) => {
              return (
                <Link
                  to={`/blog/${item.id}`}
                  className="flex flex-col gap-[20px] cursor-pointer"
                >
                  <div>
                    <img className="object-cover w-full" src={item.image} />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[16px] line-clamp-2 hover:text-[#14c9c9] hover:font-semibold cursor-pointer">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-[20px]" />
                    </div>

                    <p className="text-[12px] text-gray-400 line-clamp-2">
                      {item.des}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Pagination
            totalItems={dataBlogs.length}
            limit={6}
            pageCurrent={pageCurrent}
            setPageCurrent={setPageCurrent}
          />
        </div>
        <div className="flex-1 ">
          <RecentBlogs />
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogList;
