import RecentBlogs from "@components/RecentBlogs";
import MainLayout from "../../layouts/MainLayout";
import { listBlogs } from "../../constants/listBlogs";

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { id } = useParams();
  const blog = listBlogs.find((item) => String(item.id) === id);

  if (!blog) {
    return (
      <MainLayout>
        <div className="mt-20 text-center ">
          <h2 className="text-2xl font-semibold">Blog không tồn tại</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 sm:px-6 lg:px-0 mt-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT CONTENT */}
          <motion.div
            className="flex-[3] flex flex-col gap-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Image */}
            <div className="w-full overflow-hidden rounded-xl">
              <motion.img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                {blog.title}
              </h1>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                {blog.des}
              </p>
            </div>

            {/* Comment Section */}
            <motion.div
              className="flex flex-col gap-8 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold">Leave a Comment</h2>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label className="font-medium">Nick Name</label>
                    <input
                      placeholder="Your name"
                      className="px-4 py-3 bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14c9c9]"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-2">
                    <label className="font-medium">E-mail</label>
                    <input
                      placeholder="Your email"
                      className="px-4 py-3 bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14c9c9]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Write a Message</label>
                  <textarea className="h-[180px] sm:h-[220px] bg-gray-100 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14c9c9]" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-fit px-6 py-3 bg-[#14c9c9] rounded-xl text-white font-semibold hover:bg-[#0fb5b5] transition"
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* SIDEBAR */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RecentBlogs />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
