import Radio from "@components/Radio";

const AddressItem = ({
  id,
  name,
  checked,
  value,
  setValue,
  address,
  setIsShowAddEditAddress,
  setEdittingData,
  setMode,
  handleDelete,
}: {
  id?: string;
  name: string;
  checked: boolean;
  value: string | undefined;
  setValue: (val: string) => void;
  address: string;
  setIsShowAddEditAddress: (isShowAddEditAddress: boolean) => void;
  setEdittingData: (
    edittingData: null | { id?: string; name: string; address: string }
  ) => void;
  setMode: (mode: string) => void;
  handleDelete: (id: string | undefined) => void;
}) => {
  const openEditting = () => {
    setMode("edit");
    setEdittingData({
      id,
      name,
      address,
    });
    setIsShowAddEditAddress(true);
  };
  return (
    <>
      <label className="flex gap-[8px] p-[20px] flex-wrap items-center justify-center border-[#EAECF0] border-[1px] rounded-[16px] mt-[20px]">
        <div className="flex gap-[10px] items-center flex-1">
          <Radio
            name={name}
            checked={checked}
            value={value ? value : ""}
            setValue={setValue}
          />
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[16px] text-black font-semibold">{name}</h3>
            <p className="text-[14px] text-[#98A2B3]">{address}</p>
          </div>
        </div>
        <div className="flex gap-[16px] items-center text-[14px] font-semibold">
          <p className="text-[#3491FA] cursor-pointer" onClick={openEditting}>
            Edit
          </p>
          <div className="h-[20px] w-[1px] bg-[rgb(234,236,240)]"></div>
          <p
            className="text-[#F53F3F] cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            Remove
          </p>
        </div>
      </label>
    </>
  );
};

export default AddressItem;
