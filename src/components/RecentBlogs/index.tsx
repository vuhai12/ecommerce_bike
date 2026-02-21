import { useNavigate } from "react-router-dom";
import { listBlogs } from "@constants/listBlogs";

const RecentBlogs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="text-center px-6 py-3 bg-[#14c9c9] text-white font-semibold rounded-lg">
        <h3 className="text-lg sm:text-xl">Recent Blogs</h3>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-5">
        {listBlogs.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/blog/${item.id}`)}
            className="group flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition"
          >
            {/* Image */}
            <div className="w-[100px] sm:w-[120px] md:w-[140px] flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[80px] sm:h-[100px] md:h-[110px] object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-[#14c9c9] transition">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
                {item.des}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
