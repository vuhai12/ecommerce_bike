import icon1 from "@assets/ProductDetail/Section3/icon1.svg";
import icon2 from "@assets/ProductDetail/Section3/icon2.svg";
import icon3 from "@assets/ProductDetail/Section3/icon3.svg";
import icon4 from "@assets/ProductDetail/Section3/icon4.svg";
import icon5 from "@assets/ProductDetail/Section3/icon5.svg";
import icon6 from "@assets/ProductDetail/Section3/icon6.svg";

const dataSection3 = [
  {
    id: 1,
    icon: icon1,
    value: "28MPH",
    label: "Top Speed",
  },
  {
    id: 1,
    icon: icon2,
    value: "4’’ Fat Tires",
    label: "Tires",
  },
  {
    id: 1,
    icon: icon3,
    value: "750W",
    label: "Motor Power",
  },
  {
    id: 1,
    icon: icon4,
    value: "Up to 60 Miles",
    label: "Range",
  },
  {
    id: 5,
    icon: icon5,
    value: "400 Ibs",
    label: "Payload capacity",
  },
  {
    id: 6,
    icon: icon6,
    value: "iOS, Android",
    label: "Phone App",
  },
];

const Section3 = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:justify-items-start justify-items-center text-center gap-y-[48px] p-[50px] bg-[#23272F]">
      {dataSection3.map((item, _) => {
        return (
          <div className="flex gap-[20px] items-center">
            <img src={item.icon} />
            <div className="flex flex-col gap-[4px] flex-1">
              <h2 className="text-[30px] text-[#E8FFFB] font-semibold">
                {item.value}
              </h2>
              <p className="text-[#07828B] text-[18px]">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Section3;
