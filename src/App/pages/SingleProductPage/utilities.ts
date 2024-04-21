import { ProductResponse } from '../MainPage/components/ProductGrid/types';

export const normalizeProduct = (data: ProductResponse[]) => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryName: item.category.name,
    categoryId: item.category.id,
    image: item.images[0].replace(/\["/, '').replace(/"\]/, ''),
  }));
};
