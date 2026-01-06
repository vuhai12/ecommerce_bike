const dataSection3 = [
  {
    id: 1,
    value: "5896",
    title: "Customer Served",
    lable:
      "We offer emission-free local travel, Not only doing something good.",
  },
  {
    id: 2,
    value: "1587",
    title: "Reviews",
    lable:
      "Simply bock using our super app, chose your destination, jump in to our nearby service.",
  },
  {
    id: 3,
    value: "21",
    title: "Certifications",
    lable:
      "Know your travel octet's in advance then you can simply pay it using our super apps.",
  },
  {
    id: 4,
    value: "8956",
    title: "Value Proposition",
    lable:
      "We offer emission-free local travel, Not only doing something good for yourself.",
  },
];

const Section1 = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-[50px] lg:gap-[64px] ">
        {dataSection3.map((item, _) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-[20px] items-center"
            >
              <h2 className="break-all text-[48px] text-[#14C9C9]  font-semibold">
                {item.value}
              </h2>
              <h3 className="break-all text-[24px] text-black font-semibold">
                {item.title}
              </h3>
              <p className="text-[#667085] textx-[16px] break-all text-center">
                {item.lable}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Section1;
