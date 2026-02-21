const NewsLetterSection = () => {
  return (
    <section className="relative z-30 mt-16 mb-[-100px] px-4 sm:px-6 lg:px-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-2xl bg-[#14C9C9] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row gap-10">
          {/* Left Content */}
          <div className="flex flex-col gap-4 flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug">
              Get updates on new gear and discounts
            </h2>
            <p className="text-base sm:text-lg text-[#F2F4F7]">
              Stay up to date on new and exciting things available to you soon!
            </p>
          </div>

          {/* Right Form */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl px-4 py-3 bg-transparent border border-white text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <p className="text-sm text-[#F2F4F7]">
                We care about your data in our{" "}
                <span className="underline cursor-pointer">privacy policy</span>
              </p>
            </div>

            <button className="w-full h-fit sm:w-auto rounded-xl bg-[#00424D] px-6 py-3 text-sm font-semibold text-[#E8FFFB] hover:bg-[#00333b] transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterSection;
