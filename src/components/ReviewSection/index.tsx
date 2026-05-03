import { useEffect, useMemo, useState } from "react";
import {
  getReviewsThunk,
  postReviewThunk,
} from "../../features/reviews/reviewsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Props = {
  productHandle: string;
};

const ReviewSection = ({ productHandle }: Props) => {
  const dispatch = useAppDispatch();
  const { reviews, summary, loadingGet, loadingPost, error } = useAppSelector(
    (state) => state.reviews,
  );

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (productHandle) {
      dispatch(getReviewsThunk(productHandle));
    }
  }, [dispatch, productHandle]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await dispatch(
      postReviewThunk({
        productHandle,
        customerName,
        customerEmail,
        rating,
        content,
      }),
    );

    setCustomerName("");
    setCustomerEmail("");
    setRating(5);
    setHoverRating(0);
    setContent("");
  };

  const displayRating = hoverRating || rating;

  const averageStars = useMemo(() => {
    const rounded = Math.round(summary.averageRating || 0);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }, [summary.averageRating]);

  const formatDate = (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Product review
        </h2>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Share your thoughts about this product
        </p>
      </div>

      <div className="mb-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-4xl font-extrabold md:text-5xl">
            {summary.averageRating?.toFixed?.(1) || "0.0"}
          </div>

          <div>
            <div className="text-2xl tracking-wider text-amber-400">
              {averageStars}
            </div>
            <div className="mt-1 text-sm text-white/80">
              {summary.reviewCount} reviews
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">Write your review</h3>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your rating
            </label>

            <div className="flex flex-wrap items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-4xl transition ${
                    star <= displayRating
                      ? "scale-105 text-amber-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}

              <span className="ml-2 text-sm font-semibold text-gray-700">
                {displayRating}/5
              </span>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your name
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-slate-800"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-slate-800"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Review content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your actual experience with the product..."
              rows={5}
              className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-slate-800"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loadingPost || !content.trim()}
            className="mt-5 h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingPost ? "Sending..." : "Submit Review"}
          </button>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900">Product Reviews</h3>

            {loadingGet && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
          </div>

          {!loadingGet && reviews.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
              <div className="text-3xl text-amber-400">★</div>
              <p className="mt-3 text-base font-semibold text-gray-900">
                No reviews yet
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Be the first to share your thoughts about this product
              </p>
            </div>
          )}

          <div className="space-y-4">
            {reviews.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {item.customerName || "Ẩn danh"}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>

                  <div className="text-sm tracking-wide text-amber-400">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-700">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
