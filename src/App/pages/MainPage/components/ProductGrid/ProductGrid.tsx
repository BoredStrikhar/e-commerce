import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Text from 'components/Text';
import { useProductsStore } from 'store/ProductsStore/hooks';
import { Meta } from 'utils/meta';
import LoaderPage from '../../../../pages/LoaderPage';
import Pagination from '../Pagination';
import ProductList from '../ProductList';
import s from './ProductGrid.module.scss';

const ProductGrid = () => {
  const store = useProductsStore();

  useEffect(() => {
    store.getProductsList({ offset: 0 });
  }, [store, store.search]);

  if (store.meta === Meta.loading) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={s['product-grid']}>
      <div className={s['product-grid__title-container']}>
        <Text className={s['product-grid__title']} weight="bold">
          Total Product
        </Text>
        <Text className={s['product-grid__quantity']} weight="bold" view="p-20" color="accent">
          {store.list.length}
        </Text>
      </div>
      <ProductList products={store.list} />
      <Pagination productsPerPage={9} productsQuantity={store.list.length} />
    </div>
  );
};

export default observer(ProductGrid);
