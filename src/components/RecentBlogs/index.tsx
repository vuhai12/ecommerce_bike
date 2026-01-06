import image1 from "@assets/Blogs/image1.svg";
import image2 from "@assets/Blogs/image2.svg";
import image3 from "@assets/Blogs/image3.svg";
import { useNavigate } from "react-router-dom";

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

const RecentBlogs = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="text-center px-[20px] py-[10px] bg-[#14c9c9] text-white font-semibold">
        <h3 className="text-[20px]">Recent Blogs</h3>
      </div>
      <div className="flex flex-col gap-[20px]">
        {dataBlogs.map((item, _) => {
          return (
            <div
              className="flex gap-[10px] cursor-pointer"
              onClick={() => navigate(`/blog/${item.id}`)}
            >
              <div className="flex-1">
                <img
                  src={item.image}
                  className="object-contain w-full object-center"
                />
              </div>
              <div className="flex flex-col gap-[10px] flex-1">
                <h3 className="text-[14px] font-semibold hover:text-[#14c9c9] hover:font-semibold">
                  {item.title}
                </h3>
                <p className="text-[12px] text-gray-400 line-clamp-2">
                  {item.des}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentBlogs;
