import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsLetterSection from "@components/NewsLetterSection";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="xl:max-w-[1200px] mx-auto w-full px-[20px] md:px-[50px] xl:px-0  lg:px-[100px]">
        <Header />
        {children}
        <NewsLetterSection />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
