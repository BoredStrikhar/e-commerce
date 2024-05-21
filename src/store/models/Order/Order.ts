import { ProductModel } from "../Product";

export type OrderModel = {
  products: ProductModel[];
  address: string;
  total: number;
};
