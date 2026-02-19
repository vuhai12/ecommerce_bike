import RecentBlogs from "@components/RecentBlogs";
import MainLayout from "../../layouts/MainLayout";
import image1 from "@assets/Blogs/image1.svg";
import image2 from "@assets/Blogs/image2.svg";
import image3 from "@assets/Blogs/image3.svg";
import { ArrowUpRight } from "lucide-react";
import Pagination from "@components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const dataBlogs = [
  {
    id: 1,
    image: image1,
    title: "My Dream Cycling Tour",
    des: `My dream cycling tour is about exploring new places at my own pace.
Riding through long roads, small towns, and beautiful landscapes brings a special sense of freedom.`,
  },
  {
    id: 2,
    image: image2,
    title: "Best Cycling Accessories",
    des: `Having the right cycling accessories can make every ride safer, more comfortable, and more enjoyable.`,
  },
  {
    id: 3,
    image: image3,
    title: "Cycling through The Night",
    des: `When the city falls asleep, cycling through the night feels different.
The streets are quiet, the air is cool, and every pedal stroke is calming.`,
  },
];

const BlogList = () => {
  const [pageCurrent, setPageCurrent] = useState(1);

  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-[3] flex flex-col gap-10">
            {/* BLOG GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {dataBlogs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${item.id}`}
                    className="group flex flex-col gap-4"
                  >
                    {/* Image */}
                    <div className="overflow-hidden rounded-xl">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[200px] object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-[#14c9c9] transition">
                          {item.title}
                        </h3>

                        <motion.div
                          whileHover={{ x: 4, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-3">
                        {item.des}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Pagination
                totalItems={dataBlogs.length}
                limit={6}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
              />
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <RecentBlogs />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogList;
