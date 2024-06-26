import { observer } from 'mobx-react-lite';
import React from 'react';
import ScrollToTopButton from 'components/ScrollToTopButton';
import Text from 'components/Text';
import ProductsStore from 'store/ProductsStore';
import { ProductsStoreContext } from 'store/ProductsStore/hooks';
import { useLocalStore } from 'utils/useLocalStore';
import s from './MainPage.module.scss';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import Search from './components/Search';

const MainPage = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreContext.Provider value={productsStore}>
      <div className={s['main-page-container']}>
        <div className={s['main-page']}>
          <div className={s['main-page__title-container']}>
            <Text tag="h1" weight="bold">
              Products
            </Text>
            <Text className={s['main-page__subtitle']} view="p-20" color="secondary">
              We display products based on the latest products we have, if you want to see our old products please enter
              the name of the item
            </Text>
          </div>
          <Search />
          <div className={s['main-page__filter-container']}>
            <CategoryFilter />
          </div>
          <ScrollToTopButton />
          <ProductGrid />
        </div>
      </div>
    </ProductsStoreContext.Provider>
  );
};

export default observer(MainPage);
