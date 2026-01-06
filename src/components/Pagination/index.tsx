import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";

const Pagination = ({
  totalItems,
  limit,
  pageCurrent,
  setPageCurrent,
}: {
  totalItems: number;
  limit: number;
  pageCurrent: number;
  setPageCurrent: (page: number | ((page: number) => number)) => void;
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handlePre = () => {
    if (pageCurrent == 1) return;
    setPageCurrent((pageCurrent: number) => {
      return pageCurrent - 1;
    });
  };
  const handleNext = () => {
    if (pageCurrent == totalPages) return;
    setPageCurrent((pageCurrent: number) => {
      return pageCurrent + 1;
    });
  };

  return (
    <div className="flex gap-[20px]">
      <div
        onClick={handlePre}
        className="w-[50px] cursor-pointer border-[1px] border-[#14c9c9] h-[50px] rounded-[50%] flex items-center justify-center"
      >
        <ChevronLeft />
      </div>

      {pages.map((page) => {
        return (
          <div
            onClick={() => setPageCurrent(page)}
            className={classNames(
              " w-[50px] cursor-pointer border-[1px] border-[#14c9c9] h-[50px] rounded-[50%] flex items-center justify-center",
              pageCurrent == page ? "bg-[#14c9c9] text-white" : "white"
            )}
          >
            {page}
          </div>
        );
      })}

      <div
        onClick={handleNext}
        className="w-[50px] cursor-pointer border-[1px] border-[#14c9c9] h-[50px] rounded-[50%] flex items-center justify-center"
      >
        <ChevronRight />
      </div>
    </div>
  );
};

export default Pagination;
