import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const dataSection3 = [
  {
    id: 1,
    value: 5896,
    title: "Customer Served",
    lable:
      "We offer emission-free local travel, Not only doing something good.",
  },
  {
    id: 2,
    value: 1587,
    title: "Reviews",
    lable: "Simply book using our super app, choose your destination.",
  },
  {
    id: 3,
    value: 21,
    title: "Certifications",
    lable: "Know your travel cost in advance then you can simply pay it.",
  },
  {
    id: 4,
    value: 8956,
    title: "Value Proposition",
    lable:
      "We offer emission-free local travel, Not only doing something good.",
  },
];

const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    spring.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent =
          Math.floor(latest).toLocaleString();
      }
    });
  }, [spring]);

  return (
    <span
      ref={ref}
      className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[56px] text-[#14C9C9] font-bold"
    />
  );
};

const Section1 = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 text-center">
        {dataSection3.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col gap-5 items-center"
          >
            <Counter value={item.value} />

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
              {item.title}
            </h3>

            <p className="text-sm sm:text-base text-[#667085] max-w-[280px]">
              {item.lable}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Section1;
