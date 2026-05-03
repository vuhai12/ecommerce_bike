import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productSlice";
import React, { useEffect, useState } from "react";
import Popup from "@components/Popup";
import ProductForm from "./components/ProductForm";
import { Product } from "../../types/product.type";
import {
  Pencil,
  Trash2,
  Plus,
  ArrowUpDown,
  ChevronsUpDown,
} from "lucide-react";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  console.log("list", list);
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  const onSubmit = () => {};

  console.log("list", list);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const onCancel = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  console.log("list.len", list.length);
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
          <button className="rounded-[10px] py-[10px] px-[20px] bg-[#14c9c9] text-white flex items-center gap-[10px]">
            Import
          </button>
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
                  <span>Name</span> <ChevronsUpDown size={16} />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px] ">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Price</span> <ChevronsUpDown size={16} />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px]">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Category</span> <ChevronsUpDown size={16} />
                </div>
              </th>
              <th className="py-3 px-2 w-[100px]">
                <div className="flex items-center justify-center gap-[20px]">
                  <span>Stock</span> <ChevronsUpDown size={16} />
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

            {list.length > 0 &&
              list.map((item, index) => {
                return (
                  <tr
                    className={`border-gray-200 ${index + 1 == list.length ? "border-none" : "border-b"}`}
                  >
                    <td className="text-center py-6 text-gray-500">
                      {index + 1}
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
                      {item.category.title}
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
