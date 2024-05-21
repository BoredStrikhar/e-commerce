import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import LoaderPage from '../LoaderPage';
import s from './CartPage.module.scss';

const CartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    rootStore.cart.getProducts();
  }, []);

  const handleDecreaseClick = (id: number) => {
    rootStore.cart.removeProductFromCart(id.toString());
  };

  const handleIncreaseClick = (id: number) => {
    rootStore.cart.addProductToCart(id.toString());
  };

  const handleFindClick = () => {
    navigate('/');
  };

  const handleCheckoutClick = () => {
    navigate('/checkout')
  }

  if (rootStore.cart.meta === Meta.loading) {
    return <LoaderPage />;
  }

  if (rootStore.cart.meta === Meta.empty) {
    return (
      <div className={s['cart']}>
        <Text view="title" className={s['cart__title_empty']}>
          Your cart is empty
        </Text>
        <Text view="p-20" className={s['cart__text_empty']}>
          Let`s find something for you!
        </Text>
        <Button onClick={handleFindClick} className={s['cart__button_empty']}>
          Find Products
        </Button>
      </div>
    );
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
            <Button onClick={() => handleDecreaseClick(item.id)} className={s['product-amount-buttons__button']}>
              -
            </Button>
            <Text view="button" className={s['product-amount-buttons__amount']}>
              {rootStore.cart.cart[item.id] ? rootStore.cart.cart[item.id] : 0}
            </Text>
            <Button onClick={() => handleIncreaseClick(item.id)} className={s['product-amount-buttons__button']}>
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
        <Button onClick={handleCheckoutClick} className={s['total-block__button']}>Proceed to checkout</Button>
      </div>
    </div>
  );
};

export default observer(CartPage);
