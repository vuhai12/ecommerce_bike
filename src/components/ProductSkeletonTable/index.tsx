const ProductSkeletonTable = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="animate-pulse border-b border-gray-200">
          <td className="py-6 text-center">
            <div className="h-4 w-6 bg-gray-200 rounded mx-auto" />
          </td>

          <td className="py-6 flex justify-center">
            <div className="w-[100px] h-[100px] bg-gray-200 rounded" />
          </td>

          <td className="py-6 text-center">
            <div className="h-4 w-[120px] bg-gray-200 rounded mx-auto" />
          </td>

          <td className="py-6 text-center">
            <div className="h-4 w-[60px] bg-gray-200 rounded mx-auto" />
          </td>

          <td className="py-6 text-center">
            <div className="h-4 w-[100px] bg-gray-200 rounded mx-auto" />
          </td>

          <td className="py-6 text-center">
            <div className="h-4 w-[50px] bg-gray-200 rounded mx-auto" />
          </td>

          <td className="py-6 text-center">
            <div className="flex gap-2 justify-center">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="w-5 h-5 bg-gray-200 rounded" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductSkeletonTable;
