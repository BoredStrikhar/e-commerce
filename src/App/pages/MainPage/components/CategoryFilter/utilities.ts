import { CategoryModel } from 'store/models/Category';

export const normalize = (categoriesData: CategoryModel[]) => {
  return categoriesData.map((item) => ({ key: item.id, value: item.name }));
};
