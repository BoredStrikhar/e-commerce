import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import LoaderPage from '../LoaderPage';
import s from './CartPage.module.scss';

const CartPage = () => {
  useEffect(() => {
    rootStore.cart.getProducts();
  }, []);

  const handleDecreaseClick = (e: { stopPropagation: () => void }, id: number) => {
    e.stopPropagation();
    rootStore.cart.removeProductFromCart(id.toString());
  };

  const handleIncreaseClick = (e: { stopPropagation: () => void }, id: number) => {
    e.stopPropagation();
    rootStore.cart.addProductToCart(id.toString());
  };

  if (!rootStore.cart.products.length) {
    return <LoaderPage />;
  }

  return (
    <div className={s['cart']}>
      <Text tag="h1" view="title">
        Cart
      </Text>
      {rootStore.cart.products.map((item) => (
        <div key={item.id} className={s['product']}>
          <img src={item.images[0]} className={s['product__image']} />
          <Text view="p-20" className={s['product__title']}>
            {item.title}
          </Text>
          <Text view="p-20" className={s['product__price']}>
            {item.price + '$'}
          </Text>
          <div className={s['product-amount-buttons']}>
            <Button onClick={(e) => handleDecreaseClick(e, item.id)} className={s['product-amount-buttons__button']}>
              -
            </Button>
            <Text view="button" className={s['product-amount-buttons__amount']}>
              {rootStore.cart.cart[item.id] ? rootStore.cart.cart[item.id] : 0}
            </Text>
            <Button onClick={(e) => handleIncreaseClick(e, item.id)} className={s['product-amount-buttons__button']}>
              +
            </Button>
            <Text view="p-20" weight="bold" className={s['product__total-price']}>
              {Number(rootStore.cart.cart[item.id])
                ? '= ' + Number(item.price) * Number(rootStore.cart.cart[item.id]) + '$'
                : '= ' + 0 + '$'}
            </Text>
          </div>
        </div>
      ))}
      <div className={s['total-block']}>
        <Text view="p-20" weight="bold">
          {'Total = ' + rootStore.cart.cartTotal + '$'}
        </Text>
      </div>
    </div>
  );
};

export default observer(CartPage);
