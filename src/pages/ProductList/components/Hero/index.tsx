import imageHero from "@assets/ProductList/Hero/image-banner.webp";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${imageHero})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="py-[50px] max-w-[716px] font-semibold text-white mx-[30px] md:mx-[50px] lg:ml-[120px] relative z-[20]">
        <h3 className="md:text-[50px] text-[30px]">Interface</h3>
        <p className="line-clamp-2 text-[16px] text-gray-200">
          Your bike as a smart device.Effortless connectivity either through
          your phone or through Cyon's dedicated internet connection. 3
        </p>
      </div>
    </div>
  );
};

export default Hero;
