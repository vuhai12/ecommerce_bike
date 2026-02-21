import MainLayout from "../../layouts/MainLayout";
import { Hero } from "./AboutUs.styles";
import { motion } from "framer-motion";
import image2 from "@assets/AboutUs/image2.webp";
import image3 from "@assets/AboutUs/image5.jpg";

const AboutUs = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-[30px] px-[20px] relative z-[30] pt-[100px] md:px-[100px]"
        >
          <div className="md:max-w-[600px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:text-[50px] text-white font-semibold text-[30px] md:line-clamp-2 line-clamp-1"
            >
              Ride the Future. Go Electric
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-200 md:line-clamp-3 line-clamp-3"
            >
              We create innovative, eco-friendly electric bikes that make every
              journey smoother, greener, and more enjoyable. Our mission is to
              bring smart mobility to everyone—one ride at a time.
            </motion.p>
          </div>
        </motion.div>
      </Hero>

      {/* Content Grid */}
      <div className="mt-[50px] grid md:grid-cols-2 grid-cols-1 container">
        {/* Block 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full h-[350px] bg-[#23272f] p-[50px] flex flex-col gap-[20px]"
        >
          <h2 className="text-white text-[30px] font-semibold">
            The Eletobike Story
          </h2>
          <p className="text-gray-300 text-[16px] line-clamp-4">
            Eletobike was founded with a passion for modern mobility and a
            commitment to cleaner transportation. Inspired by the natural
            landscapes around us, we set out to design electric bikes that make
            everyday travel easier, healthier, and more sustainable.
          </p>
        </motion.div>

        {/* Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full h-[350px] overflow-hidden"
        >
          <img
            src={image2}
            className="object-cover h-full object-center w-full"
            alt="About us"
          />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full h-[350px] overflow-hidden"
        >
          <img
            src={image3}
            className="object-cover h-full object-center w-full"
            alt="About us"
          />
        </motion.div>

        {/* Block 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full h-[350px] bg-[#23272f] p-[50px] flex flex-col gap-[20px]"
        >
          <h2 className="text-white text-[30px] font-semibold">
            What We Believe In
          </h2>
          <p className="text-gray-300 text-[16px] line-clamp-4">
            We strive to deliver exceptional quality and dedicated support to
            every customer. Every electric bike we offer is backed by our
            confidence in its performance and a reliable warranty for your peace
            of mind.
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
