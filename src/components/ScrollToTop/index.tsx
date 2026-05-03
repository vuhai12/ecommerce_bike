import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showTop) return null;

  return (
    <button
      onClick={handleToTop}
      className="fixed bottom-6 right-6 z-50 bg-[#14C9C9] hover:bg-[#0fb5b5] text-white w-[48px] h-[48px] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
