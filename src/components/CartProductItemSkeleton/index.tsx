const CartProductItemSkeleton = () => {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 p-4 animate-pulse">
      <div className="h-[110px] w-[110px] rounded-xl bg-gray-200 shrink-0" />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-3 h-5 w-[70%] rounded bg-gray-200" />
          <div className="mb-2 h-4 w-[40%] rounded bg-gray-200" />
          <div className="h-4 w-[30%] rounded bg-gray-200" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-[110px] rounded-full bg-gray-200" />
          <div className="h-10 w-10 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default CartProductItemSkeleton;
