import { ProductResponse } from '../MainPage/components/ProductGrid/types';

export const normalizeProduct = (data: ProductResponse[]) => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryName: item.category.name,
    categoryId: item.category.id,
    image: item.images.map((image) => image.replace(/\["/, '').replace(/"\]/, '')),
  }));
};

export const getUniqueProducts = (data: ProductResponse[], id: string, quantity: number) => {
  const result = [...data]
    .filter((product) => product.id !== Number(id))
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  result.length = Math.min(result.length, quantity);
  return result;
};
