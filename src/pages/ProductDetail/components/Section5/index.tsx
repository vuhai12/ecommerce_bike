import { motion } from "framer-motion";

type Star = 1 | 2 | 3 | 4 | 5;

const ratings: Record<Star, number> = {
  5: 120,
  4: 45,
  3: 10,
  2: 5,
  1: 3,
};

const starOrder: Star[] = [5, 4, 3, 2, 1];

const totalReviews = 320;
const averageRating = 4.3;

const reviews = [
  {
    id: 1,
    name: "Michael Thompson",
    rating: 5,
    date: "Jan 12, 2025",
    content:
      "Absolutely love this ebike! The power and smooth ride exceeded my expectations. Perfect for long weekend rides.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    rating: 4,
    date: "Feb 02, 2025",
    content:
      "Very comfortable and stylish. Battery life is solid. Shipping was fast too!",
  },
  {
    id: 3,
    name: "David Miller",
    rating: 5,
    date: "Feb 10, 2025",
    content:
      "Best purchase this year. The acceleration is insane and it handles off-road trails easily.",
  },
];

const Section5 = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 py-16">
      <h3 className="text-2xl font-semibold text-[#23272F] mb-10">
        Ratings & Reviews
      </h3>

      {/* TOP SUMMARY */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Average Rating */}
        <div className="flex flex-col items-center lg:items-start gap-3 lg:w-1/3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= Math.round(averageRating) ? "#FACC15" : "#E5E7EB"}
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.897 1.415 8.297L12 18.896l-7.414 4.604 1.415-8.297-6.001-5.897 8.332-1.151z" />
              </svg>
            ))}
          </div>

          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>

          <div className="text-gray-500 text-sm">
            Based on {totalReviews} reviews
          </div>

          {/* Circle Rating */}
          <div
            className="w-[140px] h-[140px] rounded-full flex items-center justify-center relative mt-4"
            style={{
              background: `conic-gradient(#14C9C9 ${
                (averageRating / 5) * 360
              }deg, #E5E7EB 0deg)`,
            }}
          >
            <div className="absolute w-[105px] h-[105px] bg-white rounded-full flex items-center justify-center text-2xl font-semibold">
              {Math.round((averageRating / 5) * 100)}%
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="flex flex-col gap-4 lg:w-2/3">
          {starOrder.map((star) => {
            const count = ratings[star] || 0;
            const percent = (count / totalReviews) * 100;

            return (
              <div key={star} className="flex items-center gap-4">
                <span className="w-10 text-sm font-medium">{star} ★</span>

                <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-yellow-400 h-3 rounded-full"
                  />
                </div>

                <span className="w-10 text-sm text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{review.name}</h4>
              <span className="text-sm text-gray-400">{review.date}</span>
            </div>

            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= review.rating ? "#FACC15" : "#E5E7EB"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.897 1.415 8.297L12 18.896l-7.414 4.604 1.415-8.297-6.001-5.897 8.332-1.151z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {review.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Section5;
