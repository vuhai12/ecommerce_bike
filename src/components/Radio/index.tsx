const Radio = ({
  label,
  handle,
  checked,
  setChecked,
}: {
  label: string;
  handle: string;
  checked: boolean;
  setChecked: (val: string) => void;
}) => {
  console.log("checked", checked);
  return (
    <label className="flex gap-[10px] items-center">
      <div className="w-[20px] h-[20px] rounded-[50%] border-[1px] border-[#D0D5DD] flex items-center justify-center">
        <input
          type="radio"
          className="hidden"
          onChange={(e) => {
            setChecked(e.target.value);
          }}
          value={handle}
          name={"category"}
        />
        {checked && (
          <div className="w-[20px] h-[20px] rounded-[50%] border-[1px] border-[#14C9C9] flex items-center justify-center">
            <div className="w-[8px] h-[8px] rounded-[50%] bg-[#14C9C9]"></div>
          </div>
        )}
      </div>

      <span>{label}</span>
    </label>
  );
};

export default Radio;
