import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import CategoriesStore from 'store/CategoriesStore';
import { useProductsStore } from 'store/ProductsStore/hooks';
import { useLocalStore } from 'utils/useLocalStore';

const CategoryFilter = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const productsStore = useProductsStore();
  const [searchParams, setSearchParams] = useSearchParams('');

  useEffect(() => {
    const category = categoriesStore.list.find((el) => el.id.toString() === searchParams.get('categoryId'));
    if (!category) {
      return;
    }
    productsStore.setCurrentCategory({ key: Number(searchParams.get('categoryId')), value: category.name });
  }, [categoriesStore.list, productsStore, productsStore.currentCategory, searchParams]);

  const setValue = (category: Option) => {
    productsStore.setCurrentCategory({ key: category.key, value: category.value });
    setSearchParams({ search: productsStore.search, categoryId: productsStore.currentCategory.key.toString() });
  };

  const getTitle = useCallback((value: Option) => (value.value ? value.value : ''), []);

  return <Dropdown options={productsStore.normalizeCategoriesList(categoriesStore.list)} value={productsStore.currentCategory} onChange={setValue} getTitle={getTitle} />;
};

export default observer(CategoryFilter);
