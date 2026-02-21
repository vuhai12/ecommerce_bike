import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";

interface PaginationProps {
  totalItems: number;
  limit: number;
  pageCurrent: number;
  setPageCurrent: (page: number | ((page: number) => number)) => void;
}

const Pagination = ({
  totalItems,
  limit,
  pageCurrent,
  setPageCurrent,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePre = () => {
    if (pageCurrent > 1) {
      setPageCurrent((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (pageCurrent < totalPages) {
      setPageCurrent((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2 bg-white shadow-sm px-4 py-3 rounded-2xl overflow-x-auto">
        {/* Previous */}
        <button
          onClick={handlePre}
          disabled={pageCurrent === 1}
          className={classNames(
            "w-9 h-9 flex items-center justify-center rounded-full border transition",
            pageCurrent === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100",
          )}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setPageCurrent(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={classNames(
              "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition",
              pageCurrent === page
                ? "bg-[#14c9c9] text-white shadow-md"
                : "hover:bg-gray-100",
            )}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={pageCurrent === totalPages}
          className={classNames(
            "w-9 h-9 flex items-center justify-center rounded-full border transition",
            pageCurrent === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100",
          )}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
