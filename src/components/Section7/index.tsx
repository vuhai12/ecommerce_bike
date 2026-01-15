import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const dataSection7 = [
  {
    id: 1,
    title: "Are Electric Bicycles safe?",
    des: "Yes, electric bicycles are faster than normal bicycles when riding in the electric-assisted mode and can go up to 25kmph speed. One can operate them as a regular bicycle by turning off the electric assist, and they will be as fast as a regular bicycle.",
  },
  {
    id: 2,
    title: "Are Electric Bicycles faster than normal bicycles?",
    des: "Yes, electric bicycles are faster than normal bicycles. With electric assistance, they can reach speeds of up to 25 km/h, allowing riders to go faster with less effort. When the electric assist is turned off, they perform like regular bicycles and ride at normal speeds.",
  },
  {
    id: 3,
    title: "Do I need a Licence to ride an Electric Bicycle?",
    des: "No, you do not need a licence to ride an electric bicycle as long as it meets local e-bike regulations (such as limited motor power and a maximum assisted speed of around 25 km/h). In these cases, electric bicycles are treated like regular bicycles and do not require a licence, registration, or insurance.",
  },
  {
    id: 4,
    title: "What is the Electric Cycle Price in India 2023?",
    des: "Here’s a good answer you can use for: “What is the Electric Cycle Price in India 2023?” In 2023, electric bicycles in India were available across a wide range of prices depending on features and specifications.",
  },
  {
    id: 5,
    title: "How fast can Electric Cycles go?",
    des: "Most electric cycles can reach speeds of up to 25 km/h in electric-assist mode, which is the standard legal limit in many countries.",
  },
  {
    id: 6,
    title: "Can Electric Cycles climb up-hills easily?",
    des: "Yes. Electric cycles can climb up-hills much more easily than regular bicycles. The electric motor provides extra power while pedaling, reducing the effort needed on steep slopes and making uphill rides smoother and less tiring, even on longer climbs",
  },
  {
    id: 7,
    title: "Can you lose weight by riding Electric Bicycles?",
    des: "Yes. You can lose weight by riding electric bicycles. Even with electric assistance, you still pedal and burn calories.",
  },
  {
    id: 8,
    title: "What is the range of an Electric Bicycle?",
    des: "The range of an electric bicycle typically varies from 30 to 100 km on a single charge, depending on factors such as battery capacity, terrain, rider weight, riding speed, and the level of electric assistance used",
  },
];

const Section7 = () => {
  const [isListOpen, setIsListOpen] = useState<number[]>([1]);

  const handleClickChangeTab = (id: number) => {
    if (isListOpen.includes(id)) {
      setIsListOpen(isListOpen.filter((item) => item !== id));
    } else {
      setIsListOpen([...isListOpen, id]);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-[20px] justify-center items-center mx-auto xl:max-w-[1200px] lg:px-[100px] md:px-[50px] px-[10px] xl:px-0">
        <h1 className="md:text-[40px] text-[30px] font-semibold">
          FAQ for Electobike
        </h1>
        <p className="text-[18px] text-[#667085] text-center">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>
      <div className="flex flex-col gap-[24px] mt-[50px]">
        {dataSection7.map((item, _) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-[8px] cursor-pointer"
              onClick={() => handleClickChangeTab(item.id)}
            >
              <div className="flex justify-between pb-[16px] border-b-[1px] border-[#EAECF0]">
                <h1 className="text-[18px] font-semibold text-black flex-1 w-full line-clamp-1">
                  {item.title}
                </h1>
                {!isListOpen.includes(item.id) ? (
                  <div className="w-[20px] h-[20px] rounded-[50%] border-[2px] border-[#98A2B3] flex justify-center items-center">
                    <Plus className="w-full h-full text-[#98A2B3]" />
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px] rounded-[50%] border-[2px] border-[#98A2B3] flex justify-center items-center">
                    <Minus className="w-full h-full text-[#98A2B3]" />
                  </div>
                )}
              </div>
              {isListOpen.includes(item.id) && (
                <p className="text-[16px] text-[#98A2B3]">{item.des}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section7;
