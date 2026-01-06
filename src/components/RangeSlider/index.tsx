import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const RangeSlider = () => {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="px-[10px] flex gap-[16px] flex-col">
      <Slider
        range
        min={0}
        max={100}
        allowCross={false}
        value={range}
        onChange={(val: any) => setRange(val)}
        trackStyle={{ backgroundColor: "#14C9C9" }}
        handleStyle={[
          { borderColor: "#14C9C9", backgroundColor: "#fff" },
          { borderColor: "#14C9C9", backgroundColor: "#fff" },
        ]}
      />
      <p className="flex justify-between  text-black font-semibold text-[16px]">
        <p>{range[0]}$</p>
        <p>{range[1]}$</p>
      </p>
    </div>
  );
};

export default RangeSlider;
