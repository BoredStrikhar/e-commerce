import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import { ProductModel } from 'store/models/Product';
import s from './ProductList.module.scss';

type ProductListProps = {
  products: ProductModel[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const handleButtonClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
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
          actionSlot={<Button onClick={handleButtonClick}>Add to Cart</Button>}
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
};

export default memo(ProductList);
