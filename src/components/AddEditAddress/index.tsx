import { XMarkIcon } from "@heroicons/react/24/outline";

const AddEditAddress = ({
  setIsShowAddEditAddress,
  setEdittingData,
  edittingData,
  handleAdd,
  handleUpdate,
  mode,
}: {
  setIsShowAddEditAddress: (isShowAddEditAddress: boolean) => void;
  setEdittingData: (
    edittingData: null | { id?: string; name: string; address: string }
  ) => void;
  edittingData: null | { name: string; address: string };
  handleAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mode: string;
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-45"
        onClick={() => setIsShowAddEditAddress(false)}
      ></div>
      <form className="p-[30px] z-10 rounded-[10px] bg-white mx-[10px] flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <h3 className="text-[20px] font-semibold">
            {mode == "add" ? "Add Address" : "Update Address"}
          </h3>
          <XMarkIcon
            onClick={() => setIsShowAddEditAddress(false)}
            className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer text-right"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label>Ward</label>
          <input
            onChange={(e) =>
              setEdittingData({
                ...(edittingData || { name: "", address: "" }),
                name: e.target.value,
              })
            }
            value={edittingData ? edittingData?.name : ""}
            className="p-[15px] bg-white border-[1px] border-gray-400 w-full rounded-[10px]"
            placeholder="Fill Your Ward"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label>Street</label>
          <input
            onChange={(e) =>
              setEdittingData({
                ...(edittingData || { name: "", address: "" }),
                address: e.target.value,
              })
            }
            value={edittingData ? edittingData?.address : ""}
            className="p-[15px] bg-white border-[1px] border-gray-400 rounded-[10px] w-full"
            placeholder="Fill Your Street"
          />
        </div>

        <button
          onClick={mode == "add" ? handleAdd : handleUpdate}
          className="p-[15px] w-full text-[18px] font-semibold text-white bg-[#14c9c9] rounded-[10px]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditAddress;
