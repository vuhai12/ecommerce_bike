import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const dataSection7 = [
  {
    id: 1,
    title: "Are Electric Bicycles safe?",
    des: "Yes, electric bicycles are faster than normal bicycles when riding in the electric-assisted mode and can go up to 25kmph speed...",
  },
  {
    id: 2,
    title: "Are Electric Bicycles faster than normal bicycles?",
    des: "Yes, electric bicycles are faster than normal bicycles...",
  },
  {
    id: 3,
    title: "Do I need a Licence to ride an Electric Bicycle?",
    des: "No, you do not need a licence to ride an electric bicycle...",
  },
  {
    id: 4,
    title: "What is the Electric Cycle Price in India 2023?",
    des: "In 2023, electric bicycles in India were available across a wide range of prices...",
  },
  {
    id: 5,
    title: "How fast can Electric Cycles go?",
    des: "Most electric cycles can reach speeds of up to 25 km/h...",
  },
  {
    id: 6,
    title: "Can Electric Cycles climb up-hills easily?",
    des: "Yes. Electric cycles can climb up-hills much more easily...",
  },
  {
    id: 7,
    title: "Can you lose weight by riding Electric Bicycles?",
    des: "Yes. You can lose weight by riding electric bicycles...",
  },
  {
    id: 8,
    title: "What is the range of an Electric Bicycle?",
    des: "The range of an electric bicycle typically varies from 30 to 100 km...",
  },
];

const Section7 = () => {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const handleToggle = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  return (
    <section className="py-5 px-4 overflow-x-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col gap-5 justify-center items-center mx-auto max-w-[800px] text-center mb-12"
      >
        <h1 className="md:text-[40px] text-[30px] font-semibold">
          FAQ for Electrobike
        </h1>

        <p className="text-[18px] text-[#667085]">
          Powerful, self-serve product and growth analytics to help you convert
          and retain more users.
        </p>
      </motion.div>

      {/* FAQ LIST */}
      <div className="max-w-[900px] mx-auto flex flex-col gap-6">
        {dataSection7.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 120 }}
              className="border-b border-[#EAECF0] pb-4"
            >
              {/* TITLE */}
              <div
                onClick={() => handleToggle(item.id)}
                className="flex justify-between items-center cursor-pointer gap-4"
              >
                <h3 className="text-[16px] sm:text-[18px] font-semibold text-black">
                  {item.title}
                </h3>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 flex justify-center items-center border-2 border-[#98A2B3] rounded-full"
                >
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-[#98A2B3]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#98A2B3]" />
                  )}
                </motion.div>
              </div>

              {/* CONTENT */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[14px] sm:text-[16px] text-[#98A2B3] mt-4 leading-relaxed">
                      {item.des}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Section7;
