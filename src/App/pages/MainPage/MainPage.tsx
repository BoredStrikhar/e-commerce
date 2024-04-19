import Text from 'components/Text';
import styles from './MainPage.module.scss';
import Search from './components/Search';
import Filter from './components/Filter';
import ProductGrid from './components/ProductGrid';

const MainPage = () => {
  return (
    <div className={styles.main_page_container}>
      <div className={styles.main_page_inner_container}>
        <div className={styles.main_page_title_container}>
          <Text tag="div">
            <h1>Products</h1>
          </Text>
          <Text className={styles.main_page_subtitle} color="secondary">
            <span>
              We display products based on the latest products we have, if you want to see our old products please enter
              the name of the item
            </span>
          </Text>
        </div>
        <Search />
        <div className={styles.filter_container}>
          <Filter />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
};

export default MainPage;
