import image1 from "@assets/Section4/image1.svg";
import image2 from "@assets/Section4/image2.svg";

const Section4 = () => {
  return (
    <div>
      <div className="flex gap-[20px] flex-col justify-center items-center max-w-[900px] mx-auto">
        <h1 className="md:text-[40px] font-semibold text-[30px]">
          <span className="text-black">An Ebike for </span>
          <span className="text-[#14C9C9]">Every </span>
          <span className="text-black">Type of </span>
          <span className="text-[#14C9C9]">Rider</span>
        </h1>
        <p className="text-[18px] text-[#667085] text-center">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>

      <div className="flex flex-wrap lg:flex-row flex-col mt-[50px]">
        <div className="lg:w-1/2 w-full bg-[#23272F] flex flex-col p-[30px] gap-[32px] md:p-[50px] ">
          <h3 className="md:text-[48px] font-semibold text-[30px]">
            <span className="text-[#14C9C9]">Beyond </span>
            <span className="text-white">the bike</span>
          </h3>
          <p className="text-[24px] font-semibold text-white line-clamp-1">
            Real Riders. Real Experiences.
          </p>
          <p className="text-[16px] text-[#98A2B3] line-clamp-2">
            Our mini-series, Beyond the Bike, captures the stories of Aventon
            riders and how their ebikes are used in unexpected ways to bring
            them closer to what makes them feel most alive.
          </p>
        </div>
        <div className="lg:w-1/2 w-full">
          <img src={image1} className="w-full h-full object-cover" />
        </div>
        <div className="lg:w-1/2 w-full">
          <img src={image2} className="w-full h-full object-cover" />
        </div>
        <div className="lg:w-1/2 w-full bg-[#23272F] flex flex-col gap-[32px] p-[30px] md:p-[50px] ">
          <h3 className="md:text-[48px] font-semibold text-[30px]">
            <span className="text-[#14C9C9]">21 </span>
            <span className="text-white">Day At </span>
            <span className="text-[#14C9C9]">Home Trial</span>
          </h3>
          <p className="text-[24px] font-semibold text-white line-clamp-1">
            Real Riders. Real Experiences.
          </p>
          <p className="text-[16px] text-[#98A2B3] line-clamp-2">
            Buying a product online, can be scary. This is why we have a free
            21-day at-home trial for all new bike purchases. If your new
            ELECTROBIKE isn't the perfect fit, we'll pay for return shipping and
            issue a full refund.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;
