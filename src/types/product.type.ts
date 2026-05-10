export type ProductFormType = {
  title: string;
  stock: number;
  description: string;
  categoryHandle: "comfort" | "light-trail" | "full-suspension";
  price: number;
  image?: File | undefined;
};

export interface Product {
  id: string;
  title: string;
  handle: string;
  stock: number;
  descriptionHtml: string;
  description: string;
  images: string[];
  price: number;
  image: string;
  averageRating: number;
  reviewCount: number;
  category: {
    id: string;
    handle: string;
    title: string;
  };
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
}

export interface ProductUpateResponse {
  success: boolean;
  product: Product;
}

export interface ProductImage {
  url: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  inventoryQuantity: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ProductDetail {
  id: string;
  title: string;
  handle: string;
  averageRating: number;
  reviewCount: number;
  price: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: {
    motorController: string;
    battery: string;
    motor: string;
    pedalAssist: string;
    fatTires: string;
  };
  accessories: {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage: string;
    price: string;
    variant: { id: string; price: string; inventoryQuantity: number };
  }[];
}

export interface GetProductDetailResponse {
  success: boolean;
  product: ProductDetail;
  message?: string;
}

export interface FilterProductsProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  listCategory: { label: string; handle: string }[];
  priceRange: [number, number];
  onPriceChangeComplete: (range: [number, number]) => void;
}

export type FilterBarProps = {
  setIsShowFilterBar: React.Dispatch<React.SetStateAction<boolean>>;
  isShowFilterBar: boolean;
};

export type SelectProps = {
  options: { id: string; label: string }[];
  sortValue: string;
  setSortValue: (val: string) => void;
};
