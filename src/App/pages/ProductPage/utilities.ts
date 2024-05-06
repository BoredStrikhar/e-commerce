import { ProductApi } from "store/models/Product";

export const getUniqueProducts = (data: ProductApi[], id: string, quantity: number) => {
  const result = [...data]
    .filter((product) => product.id !== Number(id))
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  result.length = Math.min(result.length, quantity);
  return result;
};
