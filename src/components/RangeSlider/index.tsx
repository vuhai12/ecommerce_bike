import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const RangeSlider = () => {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="flex flex-col gap-5">
      {/* SLIDER */}
      <div className="px-2">
        <Slider
          range
          min={0}
          max={100}
          allowCross={false}
          value={range}
          onChange={(val: any) => setRange(val)}
          trackStyle={{ backgroundColor: "#14C9C9", height: 6 }}
          railStyle={{ backgroundColor: "#E5E7EB", height: 6 }}
          handleStyle={[
            {
              borderColor: "#14C9C9",
              backgroundColor: "#ffffff",
              width: 18,
              height: 18,
              marginTop: -6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
            {
              borderColor: "#14C9C9",
              backgroundColor: "#ffffff",
              width: 18,
              height: 18,
              marginTop: -6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
          ]}
        />
      </div>

      {/* VALUE DISPLAY */}
      <div className="flex justify-between items-center text-sm font-semibold">
        <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800">
          ${range[0]}
        </div>

        <div className="text-gray-400 font-normal">—</div>

        <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800">
          ${range[1]}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
