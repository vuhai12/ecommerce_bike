import Footer from "@components/Footer";
import Header from "@components/Header";
import NewsLetterSection from "@components/NewsLetterSection";
import { ReactNode } from "react";

const ProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Header />
      <div className="container">
        {/* <HeaderProduct /> */}
        <div className="flex flex-col gap-[30px]">{children}</div>
        <NewsLetterSection />
      </div>
      <Footer />
    </div>
  );
};

export default ProductLayout;
