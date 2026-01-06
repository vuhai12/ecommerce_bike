import classNames from "classnames";

const RadioPickColor = ({
  image,
  price,
  colorPick,
  setColorPicked,
  colorPicked,
}: {
  image: string;
  price: string;
  colorPick: string;
  setColorPicked: (val: string) => void;
  colorPicked: string | undefined;
}) => {
  return (
    <label
      className={classNames(
        "flex flex-col gap-[12px] items-center justify-center"
      )}
    >
      <input
        type="radio"
        className="hidden"
        name="color"
        value={colorPick}
        onChange={(e) => setColorPicked(e.target.value)}
      />
      <div
        className={classNames(
          "w-[80px] h-[60px] rounded-[12px]  overflow-hidden p-[5px]",
          colorPick == colorPicked
            ? "border-[#14C9C9] border-[2px]  "
            : "border-[1px] border-[#EAECF0]"
        )}
      >
        <img src={image} className="w-full h-full object-contain" />
      </div>
      <p className="text-[14px] text-black font-semibold">{price}</p>
    </label>
  );
};

export default RadioPickColor;
