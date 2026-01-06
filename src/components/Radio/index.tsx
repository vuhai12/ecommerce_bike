const Radio = ({
  name,
  value,
  checked,
  setValue,
}: {
  name: string;
  value: string;
  checked: boolean;
  setValue: (val: string) => void;
}) => {
  return (
    <div>
      <label className="w-[20px] h-[20px] rounded-[50%] border-[1px] border-[#D0D5DD] flex items-center justify-center">
        <input
          type="radio"
          className="hidden"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          name={name}
          checked={checked}
        />
        {checked && (
          <div className="w-[20px] h-[20px] rounded-[50%] border-[1px] border-[#14C9C9] flex items-center justify-center">
            <div className="w-[8px] h-[8px] rounded-[50%] bg-[#14C9C9]"></div>
          </div>
        )}
      </label>
    </div>
  );
};

export default Radio;
