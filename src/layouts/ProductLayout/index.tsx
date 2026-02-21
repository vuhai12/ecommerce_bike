import Footer from "@components/Footer";
import HeaderProduct from "@components/HeaderProduct";
import NewsLetterSection from "@components/NewsLetterSection";
import { ReactNode } from "react";

const ProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="container">
        <HeaderProduct />
        <div className="flex flex-col gap-[30px]">{children}</div>
        <NewsLetterSection />
      </div>
      <Footer />
    </div>
  );
};

export default ProductLayout;
