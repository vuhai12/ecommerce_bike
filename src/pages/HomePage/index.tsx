import MainLayout from "../../layouts/MainLayout";
import Hero from "@components/Hero";
import Section1 from "@components/Section1";
import Section2 from "@components/Section2";
import Section3 from "@components/Section3";
import Section4 from "@components/Section4";
import Section6 from "@components/Section6";
import Section7 from "@components/Section7";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex gap-[65px] flex-col">
          <Hero />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          {/* <Section5 /> */}
          <Section6 />
          <Section7 />
          {/* <NewsLetterSection /> */}
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
