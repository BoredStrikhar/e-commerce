import { observer } from 'mobx-react-lite';
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import s from './ProductCartButtons.module.scss';

type ProductCartButtonsProps = {
  productId: number;
};

const ProductCartButtons: React.FC<ProductCartButtonsProps> = ({ productId }) => {
  const handleButtonClick = (e: { stopPropagation: () => void }, id: number) => {
    e.stopPropagation();
    rootStore.cart.addProductToCart(id.toString());
  };

  const handleDecreaseClick = (e: { stopPropagation: () => void }, id: number) => {
    e.stopPropagation();
    rootStore.cart.removeProductFromCart(id.toString());
  };

  const handleIncreaseClick = (e: { stopPropagation: () => void }, id: number) => {
    e.stopPropagation();
    rootStore.cart.addProductToCart(id.toString());
  };

  if (!rootStore.cart.cart[productId]) {
    return <Button onClick={(e) => handleButtonClick(e, productId)}>Add to Cart</Button>;
  }

  return (
    <div className={s['product-cart-buttons']}>
      <Button onClick={(e) => handleDecreaseClick(e, productId)} className={s['product-cart-buttons__button']}>
        -
      </Button>
      <Text view="button" className={s['product-cart-buttons__amount']}>
        {rootStore.cart.cart[productId]}
      </Text>
      <Button onClick={(e) => handleIncreaseClick(e, productId)} className={s['product-cart-buttons__button']}>
        +
      </Button>
    </div>
  );
};

export default observer(ProductCartButtons);
