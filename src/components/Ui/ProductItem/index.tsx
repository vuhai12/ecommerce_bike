import { useState } from "react";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const ProductItem = ({
  id,
  title,
  price,
  rate,
  quantity,
  image,
}: {
  title: string;
  price: string;
  rate: string;
  quantity: string;
  image: string;
  id: number;
}) => {
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full  w-full relative gap-[16px] p-[12px] border-[#EAECF0] border-[1px] rounded-[12px]">
      <div className="h-[226px] relative">
        <img
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
        onClick={() => navigate(`/product/${id}`)}
      >
        <h5 className="text-[18px] font-semibold line-clamp-2">{title}</h5>
        <p className="flex gap-[6px] items-center text-[14px]">
          <FaStar className="text-[#F7BA1E]" />
          {`(${rate})`}
          {quantity}
        </p>
        <p className="text-[18px] font-semibold">{price}</p>
      </div>
      <Link
        to={`/product/${id}`}
        className="text-black w-full flex items-center gap-[10px] justify-center rounded-[12px] py-[8px] text-[14px] font-semibold px-[14px] bg-[#E8FFFB] border-[1px] border-[#14C9C9]"
      >
        Explore
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
};

export default ProductItem;
