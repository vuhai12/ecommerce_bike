import { useMemo, useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductItem = ({
  handle,
  title,
  price,
  averageRating,
  reviewCount,
  image,
}: {
  handle: string;
  title: string;
  price: string;
  averageRating: number;
  image: string;
  reviewCount: number;
}) => {
  const [isLike, setIsLike] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const averageStars = useMemo(() => {
    const rounded = Math.round(averageRating || 0);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }, [averageRating]);

  return (
    <div className="flex flex-col h-full  w-full relative gap-[16px] p-[12px] border-[#EAECF0] border-[1px] rounded-[12px]">
      <div className="h-[226px] relative">
        <img
          loading="lazy"
          src={image}
          alt="image"
          className="w-full h-full object-contain object-center"
        />
        <div
          onClick={() => setIsLike(!isLike)}
          className={classNames(
            `absolute cursor-pointer flex items-center justify-center top-0 right-0 w-[36px] h-[36px] rounded-[50%] border-[1px] border-[#d8dadf]`,
            isLike ? "bg-[#14C9C9]" : "",
          )}
        >
          <FaHeart
            className={classNames(
              `w-[20px] h-[20px]`,
              isLike ? "text-[#E8FFFB]" : "text-[#d8dbe2]",
            )}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-[10px] flex-1 cursor-pointer"
        onClick={() => navigate(`/product/${handle}`)}
      >
        <h5 className="text-[18px] font-semibold line-clamp-2">{title}</h5>
        <div className="flex gap-[10px] items-center">
          <div className="text-2xl tracking-wider text-amber-400">
            {averageStars}
          </div>
          <div className="mt-1 text-sm  text-gray-500">
            ({reviewCount} reviews)
          </div>
        </div>

        <p className="text-[18px] font-semibold">{price} $</p>
      </div>
      <Link
        to={`/product/${handle}`}
        className="text-black w-full flex items-center gap-[10px] justify-center rounded-[12px] py-[8px] text-[14px] font-semibold px-[14px] bg-[#E8FFFB] border-[1px] border-[#14C9C9]"
      >
        {t("HeadingSection3.Explore")}
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
};

export default ProductItem;
