import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import Text from 'components/Text';
import rootStore from 'store/RootStore/instance';
import { ProductModel } from 'store/models/Product';
import s from './ProductList.module.scss';

type ProductListProps = {
  products: ProductModel[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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

  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (id: number) => {
      navigate(`/product/${id}`);
    },
    [navigate],
  );

  return (
    <div className={s['product-grid']}>
      {products.map((product, index, _products) => (
        <ProductCard
          isLast={index === Math.floor(_products.length / 9) * 9 - 10}
          key={product.id}
          image={product.images[0]}
          captionSlot={product.categoryName}
          title={product.title}
          subtitle={product.description}
          contentSlot={'$' + product.price}
          actionSlot={
            rootStore.cart.cart[product.id] ? (
              <div className={s['product-amount-buttons']}>
                <Button
                  onClick={(e) => handleDecreaseClick(e, product.id)}
                  className={s['product-amount-buttons__button']}
                >
                  -
                </Button>
                <Text view="button" className={s['product-amount-buttons__amount']}>
                  {rootStore.cart.cart[product.id]}
                </Text>
                <Button
                  onClick={(e) => handleIncreaseClick(e, product.id)}
                  className={s['product-amount-buttons__button']}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button onClick={(e) => handleButtonClick(e, product.id)}>Add to Cart</Button>
            )
          }
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
};

export default observer(ProductList);
