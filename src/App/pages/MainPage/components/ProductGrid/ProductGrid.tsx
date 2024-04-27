import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import Text from 'components/Text';
import { useProductsStore } from 'store/ProductsStore/hooks';
import { Meta } from 'utils/meta';
import LoaderPage from '../../../../pages/LoaderPage';
import ProductList from '../ProductList';
import s from './ProductGrid.module.scss';

const ProductGrid = () => {
  const productsStore = useProductsStore();

  const [, setSearchParams] = useSearchParams();

  const fetchMoreData = useCallback(() => {
    productsStore.fetchMoreProducts();
    setSearchParams((prev) => {
      return {
        ...Array.from(prev.entries()).reduce(
          (accum, [key, value]) => {
            accum[key] = value;
            return accum;
          },
          {} as Record<string, string>,
        ),
        currentPage: productsStore.currentPage.toString(),
      };
    });
  }, [productsStore, setSearchParams]);

  useEffect(() => {
    productsStore.getProductsList({
      title: productsStore.search,
      categoryId: productsStore.currentCategory.key,
      limit: (productsStore.currentPage + 1) * 9,
      offset: 0,
    });
  }, [productsStore, productsStore.search, productsStore.currentCategory.key]);

  if (productsStore.meta === Meta.loading) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={s['product-grid']}>
      <div className={s['product-grid__title-container']}>
        <Text className={s['product-grid__title']} weight="bold">
          Total Product
        </Text>
        <Text className={s['product-grid__quantity']} weight="bold" view="p-20" color="accent">
          {productsStore.list.length}
        </Text>
      </div>
      <InfiniteScroll
        dataLength={productsStore.list.length}
        next={fetchMoreData}
        hasMore={productsStore.hasMore}
        loader={<h4>Loading...</h4>}
      >
        <ProductList products={productsStore.list} />
      </InfiniteScroll>
    </div>
  );
};

export default observer(ProductGrid);
