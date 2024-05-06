import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import { useCategoriesStore } from 'store/CategoriesStore/hooks';
import { useProductsStore } from 'store/ProductsStore/hooks';
import { normalize } from './utilities';

const CategoryFilter = () => {
  const categoriesStore = useCategoriesStore();
  const productsStore = useProductsStore();

  const [searchParams, setSearchParams] = useSearchParams('');

  React.useEffect(() => {
    const category = categoriesStore.list.find((el) => el.id.toString() === searchParams.get('categoryId'));

    if (!category) {
      return;
    }

    productsStore.currentCategory.key = Number(searchParams.get('categoryId'));
    productsStore.currentCategory.value = category.name;
  }, [categoriesStore.list, productsStore.currentCategory, searchParams]);

  const setValue = (category: Option) => {
    productsStore.currentCategory.key = category.key;
    productsStore.currentCategory.value = category.value;
    setSearchParams({ search: productsStore.search, categoryId: productsStore.currentCategory.key.toString() });
  };

  const getTitle = React.useCallback((value: Option) => (value.value ? value.value : 'Categories'), []);

  const normalizedCategories = normalize(categoriesStore.list);

  return (
    <Dropdown
      options={normalizedCategories}
      value={productsStore.currentCategory}
      onChange={setValue}
      getTitle={getTitle}
    />
  );
};

export default observer(CategoryFilter);
