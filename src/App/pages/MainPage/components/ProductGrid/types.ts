export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryName: string;
  categoryId: number;
  image: string;
};

export type ProductResponse = {
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
