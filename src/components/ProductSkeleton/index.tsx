const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-[220px] w-full mb-4" />

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />

      <div className="h-5 bg-gray-300 rounded w-1/3 mt-4" />
    </div>
  );
};

export default ProductSkeleton;
