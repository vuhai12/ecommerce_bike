import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product, ProductFormType } from "../../../../types/product.type";
import ReactQuill from "react-quill";
import ImgaeDefault from "@assets/image-default.jpg";
import { X } from "lucide-react";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();
const categoryValues = ["comfort", "light-trail", "full-suspension"] as const;

const baseProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(1, "Price must > 0"),
  stock: z.coerce.number().min(0, "Stock must >= 0"),
  categoryHandle: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(categoryValues, {
      message: "Please select category",
    }),
  ),
  description: z
    .string()
    .refine((html) => stripHtml(html).length > 0, "Description is required"),
  image: z.instanceof(File).optional(),
});

type ProductFormInput = z.input<typeof baseProductSchema>;
type ProductFormData = z.output<typeof baseProductSchema>;

const createProductSchema = (product: Product | null) =>
  baseProductSchema.refine((data) => data.image || product?.image, {
    message: "Image is required",
    path: ["image"],
  });

const ProductForm = ({
  onSubmit,
  product,
  onCancel,
}: {
  onCancel: () => void;
  onSubmit: (productForm: ProductFormType) => void;
  product: Product | null;
}) => {
  const productSchema = createProductSchema(product);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormInput, any, ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
      categoryHandle: "",
    },
  });
  const file = watch("image");

  useEffect(() => {
    if (product) {
      reset({
        title: product?.title || "",
        price: product?.price || 0,
        stock: product?.stock || 0,
        categoryHandle: product?.category?.handle || "",
        description: product?.descriptionHtml || "",
      });
    }
  }, [product]);

  useEffect(() => {
    if (!file) {
      setPreview(product?.image || ImgaeDefault);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const description = watch("description");
  const [preview, setPreview] = useState<string>("");

  return (
    <div className="overflow-auto max-h-[500px] relative">
      <X
        size={20}
        className="absolute top-[20px] right-[20px] cursor-pointer hover:text-red-600"
        onClick={() => onCancel()}
      />
      <form
        className="flex flex-col gap-[20px] w-full p-[20px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-[25px] text-center font-semibold">
          {product ? "Edit" : "Add"}
        </h3>
        <label>
          <span>title</span>
          <input
            {...register("title")}
            className="rounded-[10px] w-full py-[10px] px-[20px] border-[1px] border-gray-200 outline-none"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </label>
        <label className="cursor-pointer">
          <div className="flex flex-col gap-[20px]">
            <div>
              <span className="py-[10px] px-[20px] text-[14px] bg-[#14c9c9] font-semibold text-white rounded-[10px]">
                Upload Image
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return; //
                  setValue("image", f, { shouldValidate: true });
                }}
              />
            </div>

            <img src={preview} className="w-[100px] h-[100px] object-cover" />
          </div>

          {errors.image && (
            <p className="text-red-500">{errors.image?.message}</p>
          )}
        </label>
        <label>
          <span>Category</span>
          <select
            {...register("categoryHandle")}
            className="border-[1px] border-gray-300 w-full rounded-[10px] py-[10px] px-[20px] outline-none"
          >
            <option value="">Select category</option>
            <option value={"full-suspension"}>Full Suspension</option>
            <option value={"comfort"}>Comfort</option>
            <option value={"light-trail"}>Light Trail</option>
          </select>
        </label>
        <label>
          <span>price</span>
          <input
            type="number"
            {...register("price")}
            className="rounded-[10px] w-full py-[10px] px-[20px] border-[1px] border-gray-200 outline-none"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </label>
        <label>
          <span>stock</span>
          <input
            {...register("stock")}
            type="number"
            className="rounded-[10px] w-full py-[10px] px-[20px] border-[1px] border-gray-200 outline-none"
          />
          {errors.stock && (
            <p className="text-red-500">{errors.stock.message}</p>
          )}
        </label>
        <label>
          <span>Description</span>
          <ReactQuill
            theme="snow"
            value={description || ""}
            onChange={(value) => {
              setValue("description", value, { shouldValidate: true });
            }}
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="w-full font-semibold py-[10px] px-[30px] bg-[#14c9c9] text-white rounded-[10px]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
