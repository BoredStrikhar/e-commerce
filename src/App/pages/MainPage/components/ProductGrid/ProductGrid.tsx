import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import LoaderPage from '../../../../pages/LoaderPage';
import { normalizeProduct } from '../../../ProductPage/utilities';
import Pagination from '../Pagination';
import ProductList from '../ProductList';
import s from './ProductGrid.module.scss';
import { Product, ProductResponse } from './types';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);

  const productsPerPage = 9;

  useEffect(() => {
    axios
      .get<ProductResponse[]>('https://api.escuelajs.co/api/v1/products?offset=0&limit=50')
      .then((response) => {
        setProductsQuantity(response.data.length);
        setProducts(normalizeProduct(response.data.slice(0, 9)));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Error while getting products');
        }
      });
  }, []);

  if (!products.length) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={s['product-grid']}>
      <div className={s['product-grid__title-container']}>
        <Text className={s['product-grid__title']} weight="bold">
          Total Product
        </Text>
        <Text className={s['product-grid__quantity']} weight="bold" view="p-20" color="accent">
          {productsQuantity}
        </Text>
      </div>
      <ProductList products={products} />
      <Pagination productsPerPage={productsPerPage} productsQuantity={productsQuantity} />
    </div>
  );
};

export default ProductGrid;
