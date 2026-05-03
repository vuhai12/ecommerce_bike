import { motion } from "framer-motion";
import BlogItem from "@components/Ui/BlogItem";
import { Link } from "react-router-dom";
import { listBlogs } from "@constants/listBlogs";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Section6 = () => {
  return (
    <section className="py-5 px-4 overflow-hidden container">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col gap-5 justify-center items-center mx-auto max-w-[900px] text-center mb-12"
      >
        <h1 className="md:text-[40px] text-[30px] font-semibold">
          Latest blog post
        </h1>

        <p className="text-[18px] text-[#667085]">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users.
        </p>
      </motion.div>

      {/* BLOG GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8"
      >
        {listBlogs.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <BlogItem
              id={item.id}
              title={item.title}
              image={item.image}
              des={item.des}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* VIEW ALL */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          to="/blog-list"
          className="text-[16px] text-white font-semibold rounded-xl px-6 py-3 bg-[#14C9C9] inline-block"
        >
          View All
        </Link>
      </motion.div>
    </section>
  );
};

export default Section6;
