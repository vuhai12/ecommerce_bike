import iconPlusCircle from "@assets/CartAddress/icon-plus-circle.svg";
import AddressItem from "./components/AddressItem";
import { useState } from "react";
import CheckoutLayout from "../../layouts/CheckoutLayout";
import AddEditAddress from "@components/AddEditAddress";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const data = [
  {
    id: "1",
    address: "Ha Noi",
    name: "30 Phố Huế, Hà Nội",
  },
  {
    id: "2",
    address: "Sai gon",
    name: "123 Lê Lợi, Quận 1, TP.HCM",
  },
  {
    id: "3",
    address: "Da Nang",
    name: "56 Bạch Đằng, Quận Hải Châu, Đà Nẵng",
  },
];

const AddressList = () => {
  const [value, setValue] = useState("1");
  const [isShowAddEditAddress, setIsShowAddEditAddress] = useState(false);
  const [dataAddress, setDataAddress] =
    useState<{ id?: string; name: string; address: string }[]>(data);
  const navigate = useNavigate();
  const [edittingData, setEdittingData] = useState<null | {
    id?: string;
    name: string;
    address: string;
  }>(null);

  const [mode, setMode] = useState("");

  const openAdd = () => {
    setIsShowAddEditAddress(true);
    setEdittingData(null);
    setMode("add");
  };

  const uid = nanoid();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (edittingData) {
      const addData = {
        id: uid,
        name: edittingData?.name,
        address: edittingData.address,
      };
      setDataAddress([...dataAddress, addData]);
      setIsShowAddEditAddress(false);
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (edittingData) {
      const newDataUpdate = dataAddress.map((item) =>
        item.id == edittingData.id ? edittingData : item
      );
      setDataAddress(newDataUpdate);
      setIsShowAddEditAddress(false);
    }
  };

  const handleDelete = (id: string | undefined) => {
    if (id) {
      const newData = dataAddress.filter((item) => item.id != id);
      setDataAddress(newData);
    }
  };

  return (
    <>
      <CheckoutLayout>
        <div className="flex gap-[20px] flex-col mt-[30px]">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-semibold text-black">
              Saved address
            </h3>
            <div className="flex gap-[5px] cursor-pointer" onClick={openAdd}>
              <img src={iconPlusCircle} />
              <p className="text-[14px] text-[#14C9C9] font-semibold">
                Add new address
              </p>
            </div>
          </div>
          <div>
            {dataAddress.map((item) => {
              return (
                <AddressItem
                  handleDelete={handleDelete}
                  id={item.id}
                  setMode={setMode}
                  name={item.name}
                  value={item.id}
                  setValue={setValue}
                  checked={item.id == value}
                  address={item.address}
                  setIsShowAddEditAddress={setIsShowAddEditAddress}
                  setEdittingData={setEdittingData}
                />
              );
            })}
          </div>
          <div className="flex justify-between font-semibold text-[14px] flex-wrap gap-[10px]">
            <button
              onClick={() => navigate("/cart")}
              className="rounded-[10px] text-black border-[1px] border-gray-300 px-[20px] py-[10px]"
            >
              Return to cart
            </button>
            <button
              onClick={() => navigate("/checkout/payment")}
              className="rounded-[10px] text-white bg-[#14c9c9] px-[20px] py-[10px]"
            >
              Continue with shipping
            </button>
          </div>
        </div>
        {isShowAddEditAddress && (
          <AddEditAddress
            mode={mode}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            edittingData={edittingData}
            setEdittingData={setEdittingData}
            setIsShowAddEditAddress={setIsShowAddEditAddress}
          />
        )}
      </CheckoutLayout>
    </>
  );
};

export default AddressList;
