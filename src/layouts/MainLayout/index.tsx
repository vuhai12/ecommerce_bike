import { ReactNode } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import NewsLetterSection from "@components/NewsLetterSection";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">{children}</div>

        <NewsLetterSection />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
