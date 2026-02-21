import RecentBlogs from "@components/RecentBlogs";
import MainLayout from "../../layouts/MainLayout";

import { ArrowUpRight } from "lucide-react";
import Pagination from "@components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listBlogs } from "@constants/listBlogs";

const BlogList = () => {
  const [pageCurrent, setPageCurrent] = useState(1);

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-0 py-12 container overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12  ">
          {/* LEFT CONTENT */}
          <div className="flex-[3] flex flex-col gap-12">
            {/* BLOG GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 ">
              {listBlogs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${item.id}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                  >
                    {/* Image */}
                    <div className="overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[200px] sm:h-[220px] xl:h-[240px] object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#14c9c9] transition">
                          {item.title}
                        </h3>

                        <motion.div
                          whileHover={{ x: 4, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-[#14c9c9]" />
                        </motion.div>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {item.des}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            <motion.div
              className="flex justify-center pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Pagination
                totalItems={listBlogs.length}
                limit={6}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
              />
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <motion.div
            className="flex-1 lg:sticky h-fit"
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
