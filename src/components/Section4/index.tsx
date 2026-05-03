import { motion } from "framer-motion";
import image1 from "@assets/Section4/image1.webp";
import image2 from "@assets/Section4/image2.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const Section4 = () => {
  return (
    <section className="py-5 px-4 overflow-x-hidden container">
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex gap-5 flex-col justify-center items-center max-w-[900px] mx-auto text-center"
      >
        <h1 className="md:text-[40px] font-semibold text-[30px]">
          Experience <span className="text-[#14C9C9]">More Than Just</span> a
          Ride
        </h1>
      </motion.div>

      {/* CONTENT GRID */}
      <div className="flex flex-wrap lg:flex-row flex-col mt-[80px]">
        {/* TEXT BLOCK 1 */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:w-1/2 w-full bg-[#23272F] flex flex-col p-[30px] gap-[32px] md:p-[50px]"
        >
          <h3 className="md:text-[48px] font-semibold text-[30px]">
            <span className="text-[#14C9C9]">Beyond </span>
            <span className="text-white">the bike</span>
          </h3>

          <p className="text-[24px] font-semibold text-white">
            Real Riders. Real Experiences.
          </p>

          <p className="text-[16px] text-[#98A2B3]">
            Our mini-series, Beyond the Bike, captures the stories of Aventon
            riders and how their ebikes are used in unexpected ways to bring
            them closer to what makes them feel most alive.
          </p>
        </motion.div>

        {/* IMAGE 1 */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:w-1/2 w-full overflow-hidden"
        >
          <motion.img
            loading="lazy"
            src={image1}
            alt=""
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* IMAGE 2 */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:w-1/2 w-full overflow-hidden"
        >
          <motion.img
            src={image2}
            alt=""
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* TEXT BLOCK 2 */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:w-1/2 w-full bg-[#23272F] flex flex-col gap-[32px] p-[30px] md:p-[50px]"
        >
          <h3 className="md:text-[48px] font-semibold text-[30px]">
            <span className="text-[#14C9C9]">21 </span>
            <span className="text-white">Day At </span>
            <span className="text-[#14C9C9]">Home Trial</span>
          </h3>

          <p className="text-[24px] font-semibold text-white">
            Real Riders. Real Experiences.
          </p>

          <p className="text-[16px] text-[#98A2B3]">
            Buying a product online can be scary. This is why we have a free
            21-day at-home trial for all new bike purchases. If your new
            ELECTROBIKE isn't the perfect fit, we'll pay for return shipping and
            issue a full refund.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section4;
