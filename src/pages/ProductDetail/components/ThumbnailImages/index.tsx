import classNames from "classnames";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const ThumbnailImages = ({
  listImage,
  imagePicked,
  setImagePiked,
}: {
  listImage: { id: number; image: string }[];
  imagePicked: string | undefined;
  setImagePiked: (val: string) => void;
}) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <div className="flex md:gap-[24px] md:flex-row flex-col-reverse gap-[20px]">
      <div className="flex flex-row gap-[20px]  md:flex-col md:gap-[16px] md:w-[60px]">
        {listImage.map((item: { id: number; image: string }, _: any) => {
          return (
            <div
              className={classNames(
                "rounded-[12px]  overflow-hidden cursor-pointer",
                item.image == imagePicked
                  ? "border-[2px] border-[#14C9C9]"
                  : "border-[1px] border-[#EAECF0]",
              )}
              onClick={() => setImagePiked(item.image)}
            >
              <img
                src={item.image}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div className="px-[30px] h-[450px] md:h-auto pt-[30px] border-[#EAECF0] rounded-[12px] border-[1px] relative md:flex-1">
        <div
          className=" bg-contain bg-no-repeat bg-center w-full h-full"
          style={{ backgroundImage: `url(${imagePicked})` }}
        >
          <div
            onClick={() => setIsLike(!isLike)}
            className={classNames(
              `absolute cursor-pointer top-[10px] border-[1px] border-[#d8dadf] right-[10px] flex items-center justify-center rounded-[50%]  w-[36px] h-[36px]`,
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
      </div>
    </div>
  );
};

export default ThumbnailImages;
