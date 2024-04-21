import React from 'react';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import { Product } from '../ProductGrid/types';
import styles from './ProductList.module.scss';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles['product-grid']}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          captionSlot={product.categoryName}
          title={product.title}
          subtitle={product.description}
          contentSlot={'$' + product.price}
          actionSlot={
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Add to Cart
            </Button>
          }
          productId={product.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
