import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsLetterSection from "@components/NewsLetterSection";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Header />
        {children}
        <NewsLetterSection />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
