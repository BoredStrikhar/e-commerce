import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import BackButton from 'components/BackButton';
import ProductCartButtons from 'components/ProductCartButtons';
import Slider from 'components/Slider';
import Text from 'components/Text';
import SingleProductStore from 'store/SingleProductStore';
import { useLocalStore } from 'utils/useLocalStore';
import LoaderPage from '../LoaderPage';
import ProductList from '../MainPage/components/ProductList';
import s from './ProductPage.module.scss';

const ProductPage = () => {
  const singleProductStore = useLocalStore(() => new SingleProductStore());

  const location = useLocation();

  useEffect(() => {
    singleProductStore.id = Number(matchPath('/product/:id', location.pathname)?.params.id);
    singleProductStore.getProduct().then(() => {
      singleProductStore.getRelatedProducts();
    });
  }, [location.pathname, singleProductStore]);

  if (!singleProductStore.product) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={s['product-page-container']}>
      <div className={s['product-page']}>
        <div className={s['product-page__back-container']}>
          <BackButton />
        </div>
        <div className={s['product-page__product-container']}>
          <Slider className={s['product-page__product-image']} images={singleProductStore.product.images} />
          <div className={s['product-page__product-info-container']}>
            <Text view="title" tag="h1" weight="bold">
              {singleProductStore.product.title}
            </Text>
            <Text view="p-20" color="secondary" weight="normal" className={s['product-page__product-description']}>
              {singleProductStore.product.description}
            </Text>
            <div className={s['product-page__product-price-container']}>
              <Text view="title" weight="bold" className={s['product-page__product-price']}>
                {'$' + singleProductStore.product.price}
              </Text>
              <div className={s['product-page__product-buttons-container']}>
                <ProductCartButtons productId={singleProductStore.product.id}/>
              </div>
            </div>
          </div>
        </div>
        <div className={s['product-page__related-items-container']}>
          <Text className={s['product-page__related-items-title']} view="title" weight="bold">
            Related Items
          </Text>
        </div>
        <ProductList products={singleProductStore.relatedProducts} />
      </div>
    </div>
  );
};

export default observer(ProductPage);
