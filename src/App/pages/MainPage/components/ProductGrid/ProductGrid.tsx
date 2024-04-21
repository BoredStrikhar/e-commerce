import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Text from 'components/Text';
import Pagination from '../Pagination';
import ProductList from '../ProductList';
import styles from './ProductGrid.module.scss';
import { Product, ProductResponse } from './types';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);

  const productsPerPage = 9;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get<ProductResponse[]>(
          'https://api.escuelajs.co/api/v1/products?offset=0&limit=50',
        );
        setProductsQuantity(response.data.length);
        setProducts(
          response.data.slice(0, 9).map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            categoryName: item.category.name,
            categoryId: item.category.id,
            image: item.images[0].replace(/\["/, '').replace(/"\]/, ''),
          })),
        );
      } catch (error) {
        //
      }
    };
    getProducts();
  }, []);

  return (
    <div className={styles['product-grid-container']}>
      <div className={styles['product-grid-title']}>
        <Text className={styles['total-product']} weight="bold">
          Total Product
        </Text>
        <Text className={styles['product-quantity']} weight="bold" view="p-20" color="accent">
          {productsQuantity}
        </Text>
      </div>
      <ProductList products={products} />
      <Pagination productsPerPage={productsPerPage} productsQuantity={productsQuantity} />
    </div>
  );
};

export default ProductGrid;
