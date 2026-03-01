import { motion } from "framer-motion";
import imgBike from "@assets/Section2/image-bike.svg";
import bgImage from "@assets/Section2/bg-image.webp";
import { useTranslation } from "react-i18next";

const Section2 = () => {
  const { t } = useTranslation();
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
          {t("HeadLine.title.Findyour")}{" "}
          <span className="text-[#14C9C9]">{t("HeadLine.title.perfect")}</span>{" "}
          {t("HeadLine.title.Ebikeinlessthan")}{" "}
          <span className="text-[#14C9C9]">{t("HeadLine.title.3minutes")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[#667085] max-w-[700px] mb-12"
        >
          {t("HeadLine.des")}
        </motion.p>

        {/* Image with floating animation */}
        <motion.img
          loading="lazy"
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
