import React from 'react';
import Text from 'components/Text';
import styles from './MainPage.module.scss';
import Filter from './components/Filter';
import ProductGrid from './components/ProductGrid';
import Search from './components/Search';

const MainPage = () => {
  return (
    <div className={styles['main-page-container']}>
      <div className={styles['main-page-inner-container']}>
        <div className={styles['main-page-title-container']}>
          <Text tag="h1" weight="bold">
            Products
          </Text>
          <Text className={styles['main-page-subtitle']} view="p-20" color="secondary">
            <span>
              We display products based on the latest products we have, if you want to see our old products please enter
              the name of the item
            </span>
          </Text>
        </div>
        <Search />
        <div className={styles['filter-container']}>
          <Filter />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
};

export default MainPage;
