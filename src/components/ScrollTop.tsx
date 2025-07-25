import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

function ScrollTop({ threshold = 100, className = "" }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (!isVisible) {
    return null;
  }

  return (
    <button onClick={scrollToTop} className={`fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${className} `}aria-label="回到頂部" title="回到頂部">
      <ChevronUp size={24} />
    </button>
  );
}

export default ScrollTop;
