const PaymentFormCard = () => {
  return (
    <div className="p-[16px] flex gap-[16px] flex-col text-[#667085]">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-[12px] ">
          Card Number
        </label>
        <input
          placeholder="Enter Card Number"
          className="px-[16px] py-[12px] rounded-[12px] border-[1px] border-[#EAECF0] text-[16px] "
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-[12px] ">
          Name on Card
        </label>
        <input
          placeholder="Enter Name"
          className="px-[16px] py-[12px] rounded-[12px] border-[1px] border-[#EAECF0] text-[16px] "
        />
      </div>
      <div className="flex gap-[16px] justify-between md:flex-row flex-col">
        <div className="flex flex-col">
          <label className="text-[12px] ">Expiration Date</label>
          <input
            placeholder="Enter Date(MM/YY)"
            className="px-[16px] py-[12px] rounded-[12px] border-[1px] border-[#EAECF0] text-[16px] "
          />
        </div>
        <div className=" flex flex-col">
          <label className="text-[12px]">Secure Code</label>
          <input
            placeholder="Enter Secure Code"
            className="px-[16px] py-[12px] rounded-[12px] border-[1px] border-[#EAECF0] text-[16px] "
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentFormCard;
