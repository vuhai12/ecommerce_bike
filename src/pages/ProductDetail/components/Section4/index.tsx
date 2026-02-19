import classNames from "classnames";
import { useState } from "react";

const dataSection4 = [
  {
    id: 1,
    title: "Specification",
    detail: [
      { label: "Battery", value: "36v 5/10 LG Lithium battery" },
      { label: "Range", value: "Up to 60 Miles" },
      { label: "Hub Motor", value: "750W brushless gear motor" },
      { label: "Total Payload Capacity", value: "400 Ib" },
      { label: "Suggested Rider Heights", value: "4’1” ~ 6’2”" },
      { label: "Charger", value: "US standard 2.0 A smart charger" },
      { label: "Controller", value: "36V/10A" },
    ],
  },
  {
    id: 2,
    title: "Components",
    detail: [
      { label: "Frame", value: "Aluminum alloy mountain bike frame" },
      { label: "Fork", value: "Front suspension fork with lockout" },
      { label: "Brakes", value: "Hydraulic disc brakes" },
      { label: "Drivetrain", value: "Shimano 7-speed gear system" },
      { label: "Tires", value: '26" x 4.0" fat tires' },
      { label: "Handlebar", value: "Aluminum handlebar" },
      { label: "Saddle", value: "Comfort ergonomic saddle" },
      { label: "Pedals", value: "Aluminum platform pedals" },
    ],
  },
  {
    id: 3,
    title: "Geometry",
    detail: [
      { label: "Frame Size", value: "M / L" },
      { label: "Wheelbase", value: "1180 mm" },
      { label: "Top Tube Length", value: "600 mm" },
      { label: "Seat Tube Length", value: "450 mm" },
      { label: "Head Tube Angle", value: "66°" },
      { label: "Seat Tube Angle", value: "74°" },
      { label: "Chainstay Length", value: "455 mm" },
      { label: "Standover Height", value: "780 mm" },
    ],
  },
];

const Section4 = () => {
  const [tabActived, setTabActived] = useState(1);
  const handleChangeTab = (id: number) => {
    setTabActived(id);
  };
  return (
    <div className="flex gap-[32px] flex-col container">
      <div className="flex flex-[8px] flex-wrap border-[1px] border-[#EAECF0] bg-slate-200 rounded-[12px] p-[6px] items-center justify-center">
        {dataSection4.map((item, _) => {
          return (
            <div
              className={classNames(
                "py-[10px] px-[14px] text-[16px] flex-1 text-center cursor-pointer",
                tabActived == item.id
                  ? "bg-[#14C9C9] text-white rounded-[11px]"
                  : "text-[#95a0b4]",
              )}
              onClick={() => handleChangeTab(item.id)}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      {dataSection4
        .filter((item) => item.id == tabActived)
        .map((item) => {
          return (
            <>
              <h3 className="text-[18px] text-black font-semibold">
                {item.title}
              </h3>
              <div className="grid grid-cols-2 gap-[20px]">
                {item.detail.map((item) => {
                  return (
                    <>
                      <div className="text-[16px] text-gray-400">
                        {item.label}
                      </div>
                      <div className="text-[16px] text-black">{item.value}</div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Section4;
