export type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryName: string;
  categoryId: number;
  images: string[];
};

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
    id: number;
    image: string;
  };
  images: string[];
};

export const normalizeProduct = (from: ProductApi[]): ProductModel[] => {
  return from.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryName: item.category.name,
    categoryId: item.category.id,
    images: item.images.map((image) => image.replace(/\["/, '').replace(/"\]/, '')),
  }));
};
