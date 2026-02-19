import { motion } from "framer-motion";
import imgBike from "@assets/Section2/image-bike.svg";
import bgImage from "@assets/Section2/bg-image.svg";

const Section2 = () => {
  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center py-5"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-0 flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#23272F] mb-6 leading-snug"
        >
          Find your <span className="text-[#14C9C9]">perfect</span> Ebike in
          less than
          <span className="text-[#14C9C9]"> 3 minutes</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[#667085] max-w-[700px] mb-12"
        >
          Answer a few quick questions and we'll instantly recommend the best
          eBike for you. Get custom recommendations based on your height and
          riding needs.
        </motion.p>

        {/* Image with floating animation */}
        <motion.img
          src={imgBike}
          alt="Bike"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          animate={{ y: [0, -15, 0] }}
          className="w-full max-w-[700px] "
        />
      </div>
    </section>
  );
};

export default Section2;
