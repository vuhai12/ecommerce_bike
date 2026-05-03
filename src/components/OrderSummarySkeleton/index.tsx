const OrderSummarySkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 animate-pulse">
      <div className="mb-6 h-6 w-[140px] rounded bg-gray-200" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-[90px] rounded bg-gray-200" />
          <div className="h-4 w-[70px] rounded bg-gray-200" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 w-[70px] rounded bg-gray-200" />
          <div className="h-4 w-[60px] rounded bg-gray-200" />
        </div>

        <div className="my-4 h-[1px] w-full bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="h-5 w-[80px] rounded bg-gray-300" />
          <div className="h-5 w-[100px] rounded bg-gray-300" />
        </div>

        <div className="mt-6 h-[48px] w-full rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default OrderSummarySkeleton;
