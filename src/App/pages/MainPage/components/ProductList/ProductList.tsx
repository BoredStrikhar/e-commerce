import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from 'components/ProductCard';
import ProductCartButtons from 'components/ProductCartButtons';
import { ProductModel } from 'store/models/Product';
import s from './ProductList.module.scss';

type ProductListProps = {
  products: ProductModel[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
          actionSlot={<ProductCartButtons productId={product.id}/>}
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
};

export default observer(ProductList);
