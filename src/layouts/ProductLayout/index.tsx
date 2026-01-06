import Footer from "@components/Footer";
import HeaderProduct from "@components/HeaderProduct";
import NewsLetterSection from "@components/NewsLetterSection";
import { ReactNode } from "react";

const ProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1200px] mx-auto w-full px-[20px] md:px-[50px] xl:px-0  lg:px-[100px]">
      <HeaderProduct />
      <div className="flex flex-col gap-[30px]">{children}</div>
      <NewsLetterSection />
      <Footer />
    </div>
  );
};

export default ProductLayout;
