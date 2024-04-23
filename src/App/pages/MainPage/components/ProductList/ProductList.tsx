import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import { Product } from '../ProductGrid/types';
import s from './ProductList.module.scss';

type ProductListProps = {
  products: Product[];
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
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image[0]}
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

export default ProductList;
