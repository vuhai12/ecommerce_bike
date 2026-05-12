import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../features/products/productSlice";
import { useEffect, useState } from "react";
import Popup from "@components/Popup";
import ProductForm from "./components/ProductForm";
import { Product, ProductFormType } from "../../types/product.type";
import { Pencil, Trash2, Plus, ChevronsUpDown } from "lucide-react";
import ProductSkeletonTable from "@components/ProductSkeletonTable";
import { importCsvApi } from "../../services/products/productApi";
import { useDebound } from "../../customHooks/useDebound";
import Pagination from "@components/Pagination";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, totalProducts } = useAppSelector(
    (state) => state.products,
  );

  const [pageCurrent, setPageCurrent] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [searchParam, setSearchPram] = useState("");

  const searchDebond = useDebound(searchParam, 2000);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({ search: searchParam, pageCurrent, limit: 5 }));
  }, [searchDebond, pageCurrent]);

  const onSubmit = async (dataProduct: ProductFormType) => {
    if (editingProduct) {
      await dispatch(
        updateProduct({ id: editingProduct.id, payload: dataProduct }),
      );
    } else {
      await dispatch(addProduct(dataProduct));
    }

    await dispatch(fetchProducts({}));
    onCancel();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const onCancel = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
    await dispatch(fetchProducts({}));
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (sortBy: string, sortOrder: string) => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    dispatch(
      fetchProducts({
        sortBy: sortBy,
        sortOrder,
      }),
    );
  };
  return (
    <div className="mt-[30px] ">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-[10px] py-[10px] px-[20px] bg-[#14c9c9] text-white flex items-center gap-[10px]"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        <div className="flex gap-[20px] items-center">
          <label className="rounded-[10px] py-[10px] px-[20px] bg-[#14c9c9] text-white flex items-center gap-[10px]">
            <span>Import</span>
            <input
              className="hidden"
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                importCsvApi(file).then(() => {
                  dispatch(fetchProducts({}));
                });
              }}
            />
          </label>
          <button className="rounded-[10px] py-[10px] px-[20px] bg-[#120460] text-white flex items-center gap-[10px]">
            <a href="/api/export-csv">Export CSV</a>
          </button>
          <a
            download
            href="/public/templates/product-template.csv"
            className="underline cursor-pointer"
          >
            Download CSV
          </a>
          <input
            value={searchParam}
            onChange={(e) => setSearchPram(e.target.value)}
            placeholder="search"
            className="rounded-[10px] border-[1px] border-gray-300 outline-none py-[10px] px-[20px] min-w-[150px]"
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-[30px]">
        <table className="w-full border-collapse min-w-[900px]">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-2 w-[50px]">Stt</th>
              <th className="py-3 px-2 w-[100px]">Image</th>
              <th className="py-3 px-2 w-[100px]">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Name</span>{" "}
                  <ChevronsUpDown
                    size={16}
                    onClick={() => handleSort("title", sortOrder)}
                  />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px] ">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Price</span>{" "}
                  <ChevronsUpDown
                    size={16}
                    onClick={() => handleSort("price", sortOrder)}
                  />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px]">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Category</span>{" "}
                  <ChevronsUpDown
                    size={16}
                    onClick={() => handleSort("category", sortOrder)}
                  />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px]">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Stock</span>{" "}
                  <ChevronsUpDown
                    size={16}
                    onClick={() => handleSort("stock", sortOrder)}
                  />
                </div>
              </th>
              <th className="py-3 px-2 w-[200px]">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {list.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {loading && <ProductSkeletonTable />}

            {list.length > 0 &&
              !loading &&
              list.map((item, index) => {
                return (
                  <tr
                    className={`border-gray-200 ${index + 1 == list.length ? "border-none" : "border-b"}`}
                  >
                    <td className="text-center py-6 text-gray-500">
                      {(index + 1) * pageCurrent}
                    </td>
                    <td className="text-center py-6 text-gray-500 flex items-center justify-center">
                      <img
                        src={item.image}
                        className="w-[100px] h-[100px] object-contain"
                      />
                    </td>
                    <td className="text-center py-6 text-gray-500">
                      {item.title}
                    </td>
                    <td className="text-center py-6 text-gray-500">
                      {item.price}
                    </td>
                    <td className="text-center py-6 text-gray-500">
                      {item.category?.title}
                    </td>
                    <td className="text-center py-6 text-gray-500">
                      {item.stock}
                    </td>
                    <td className="text-center py-6 text-gray-500 whitespace-nowrap ">
                      <div className="flex  gap-[20px] items-center justify-center">
                        <Pencil
                          onClick={() => handleEdit(item)}
                          size={18}
                          className="text-blue-500 cursor-pointer"
                        />

                        <Trash2
                          onClick={() => handleDelete(item.id)}
                          size={18}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        limit={5}
        totalItems={totalProducts || 0}
        pageCurrent={pageCurrent}
        setPageCurrent={setPageCurrent}
      />
      {isOpen && (
        <Popup onCancel={onCancel}>
          <ProductForm
            onSubmit={onSubmit}
            product={editingProduct}
            onCancel={onCancel}
          />
        </Popup>
      )}
    </div>
  );
};

export default ProductManagement;
