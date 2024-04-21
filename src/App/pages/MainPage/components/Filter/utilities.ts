import { Category } from "./types";

export const normalize = (categoriesData: Category[]) => {
  return categoriesData.map((item) => ({ key: item.id, value: item.name }));
};
