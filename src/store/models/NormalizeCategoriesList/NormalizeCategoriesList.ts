import { CategoryModel } from 'store/models/Category';

const normalizeCategoriesList = (categoriesData: CategoryModel[]) => {
  return categoriesData.map((item) => ({ key: item.id, value: item.name }));
};

export default normalizeCategoriesList;
