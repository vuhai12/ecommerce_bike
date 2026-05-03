const ProductDetailSkeleton = () => {
  return (
    <div className="container overflow-x-hidden px-4 py-[50px] sm:px-6 lg:px-0">
      <div className="flex flex-col gap-10 lg:flex-row animate-pulse">
        <div className="w-full lg:w-1/2">
          <div className="flex h-full gap-[16px]">
            <div className="flex w-1/4 flex-col gap-3 md:w-[60px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-[12px] bg-gray-200 flex-1"
                />
              ))}
            </div>

            <div className="flex-1 rounded-[20px] bg-gray-200 " />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <div className="h-8 w-[70%] rounded bg-gray-200" />

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-5 w-5 rounded bg-gray-200" />
            ))}
            <div className="ml-2 h-5 w-12 rounded bg-gray-200" />
          </div>

          <div className="h-7 w-[120px] rounded bg-gray-200" />

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-[52px] flex-1 rounded-xl bg-gray-200" />
            <div className="h-[52px] flex-1 rounded-xl bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="h-8 w-8 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-[20px] px-4 lg:px-0">
        <div className="rounded-2xl border border-gray-200 p-6 animate-pulse">
          <div className="mb-4 h-6 w-[220px] rounded bg-gray-200" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
              >
                <div className="h-16 w-16 rounded-lg bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-2 h-4 w-[60%] rounded bg-gray-200" />
                  <div className="h-4 w-[30%] rounded bg-gray-200" />
                </div>
                <div className="h-5 w-5 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 animate-pulse">
          <div className="mb-4 h-6 w-[180px] rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-[80%] rounded bg-gray-200" />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 animate-pulse">
          <div className="mb-4 h-6 w-[160px] rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-28 rounded-xl bg-gray-200" />
                <div className="h-4 w-[80%] rounded bg-gray-200" />
                <div className="h-4 w-[50%] rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container overflow-hidden px-4 sm:px-6 lg:px-0 mt-10">
        <div className="mb-6 h-7 w-[220px] rounded bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-56 rounded-xl bg-gray-200" />
              <div className="h-4 w-[80%] rounded bg-gray-200" />
              <div className="h-4 w-[40%] rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
