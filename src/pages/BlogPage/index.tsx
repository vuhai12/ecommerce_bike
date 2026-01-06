import RecentBlogs from "@components/RecentBlogs";
import MainLayout from "../../layouts/MainLayout";
import image1 from "@assets/Blogs/image1.svg";
import image2 from "@assets/Blogs/image2.svg";
import image3 from "@assets/Blogs/image3.svg";
import { useParams } from "react-router-dom";

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

const BlogPage = () => {
  const { id } = useParams();
  const blog = dataBlogs.find((item) => String(item.id) == id);

  if (!blog) {
    return (
      <MainLayout>
        <div className="mt-[50px] text-center">
          <h2 className="text-[24px] font-semibold">Blog không tồn tại</h2>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="flex lg:flex-row flex-col gap-[30px] mt-[30px]">
        {blog && (
          <div className="flex-[3] flex flex-col gap-[30px]">
            <div className="h-[500px] w-full">
              <img
                src={blog.image}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-[18px] text-black font-semibold">
                {blog.title}
              </h3>
              <p className="text-[16px]">{blog.des}</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-[33px]">comment's</h3>
              <h3 className="text-[33px]">Leave a Comment</h3>
              <form className="flex flex-col gap-[20px]">
                <div className="flex gap-[20px] md:flex-row flex-col">
                  <div className="flex flex-col flex-1 gap-[10px]">
                    <label>Nick Name :</label>
                    <input
                      placeholder="Name"
                      className="py-[10px] px-[20px]  bg-gray-100 rounded-[10px] border-[1px] border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-[10px]">
                    <label>E-mail :</label>
                    <input
                      placeholder="email"
                      className="py-[10px] px-[20px]  bg-gray-100 rounded-[10px] border-[1px] border-gray-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-[10px]">
                  <label>Write a Message :</label>
                  <textarea className="h-[200px] bg-gray-100 py-[10px] px-[20px] border-[1px] border-gray-300 rounded-[10px]"></textarea>
                </div>
                <button
                  type="submit"
                  className="py-[10px] px-[20px] w-fit bg-[#14c9c9] rounded-[10px] text-white font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex-1">
          <RecentBlogs />
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
