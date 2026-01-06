import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogItem = ({
  id,
  title,
  des,
  image,
}: {
  id: number;
  title: string;
  des: string;
  image: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="border-[1px] cursor-pointer w-full  flex gap-[5px] flex-col overflow-hidden border-gray-200 rounded-[12px]"
    >
      <div className="h-[238px]">
        <img className="w-full h-full object-contain" src={image} />
      </div>
      <div className="flex flex-col gap-[12px] px-[16px] py-[20px]">
        <div className="flex justify-between">
          <h5 className="text-[18px] text-black font-semibold line-clamp-1 hover:text-[#14c9c9] hover:font-semibold">
            {title}
          </h5>
          <ArrowUpRight className="w-5 h-5 text-gray-700" />
        </div>
        <p className="text-[14px] text-[#667085] line-clamp-2">{des}</p>
      </div>
    </div>
  );
};

export default BlogItem;
