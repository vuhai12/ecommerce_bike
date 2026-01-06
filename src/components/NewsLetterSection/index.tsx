const NewsLetterSection = () => {
  return (
    <div className="rounded-[20px] bg-[#14C9C9] mt-[50px] p-[30px] md:p-[64px] flex gap-[32px] lg:flex-row relative z-[99] flex-col mb-[-100px] ">
      <div className="flex flex-col gap-[12px] flex-1">
        <h1 className="text-[30px] text-white font-semibold line-clamp-2">
          Get updates on new gear and discounts
        </h1>
        <p className="text-[18px] text-[#F2F4F7] line-clamp-2">
          Stay up to date on new and exciting things available to you soon!
        </p>
      </div>

      <div className="flex gap-[16px] flex-1 flex-wrap">
        <div className="flex flex-col gap-[8px] flex-1">
          <input
            placeholder="Enter your email"
            className="rounded-[12px] py-[12px] pl-[16px] w-full pr-[14px] placeholder:text-white text-white border-[1px] border-white bg-transparent"
          />
          <p className="text-[14px] text-[#F2F4F7] line-clamp-1">
            We care about your data in our
            <span className="underline"> privacy policy</span>
          </p>
        </div>

        <button className="rounded-[12px]  h-[44px] bg-[#00424D] text-[14px] px-[16px] py-[10px] text-[#E8FFFB] font-semibold">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetterSection;
