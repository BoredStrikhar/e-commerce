import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Text from 'components/Text';
import { Product, ProductResponse } from '../MainPage/components/ProductGrid/types';
import ProductList from '../MainPage/components/ProductList';
import styles from './SingleProductPage.module.scss';
import { normalizeProduct } from './utilities';

const SingleProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async (id: string) => {
      try {
        const response = await axios.get<ProductResponse>(`https://api.escuelajs.co/api/v1/products/${id}`);
        const responseArray: ProductResponse[] = [response.data];
        setProduct(normalizeProduct(responseArray)[0]);
        return product;
      } catch (error) {
        //
      }
    };
    if (id) {
      getProduct(id);
    }
  }, [id, product]);

  useEffect(() => {
    const getRelatedProducts = async (productCategoryId: number) => {
      try {
        const response = await axios.get<ProductResponse[]>(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${productCategoryId}&offset=0&limit=3`,
        );
        setRelatedProducts(normalizeProduct(response.data));
      } catch (error) {
        //
      }
    };
    if (!product?.categoryId) {
      return;
    }
    getRelatedProducts(product.categoryId);
  }, [product?.categoryId]);

  return (
    <>
      {product && (
        <div className={styles['single-product-page-container']}>
          <div className={styles['single-product-page-inner-container']}>
            <div className={styles['back-container']}>
              <BackButton />
            </div>
            <div className={styles['product-container']}>
              <img className={styles['product-image']} src={product?.image} />
              <div className={styles['product-info-container']}>
                <Text view="title" tag="h1" weight="bold" className={styles['product-title']}>
                  {product?.title}
                </Text>
                <Text view="p-20" color="secondary" weight="normal" className={styles['product-description']}>
                  {product?.description}
                </Text>
                <div className={styles['product-price-container']}>
                  <Text view="title" weight="bold" className={styles['product-price']}>
                    {'$' + product?.price}
                  </Text>
                  <div className={styles['product-buttons-container']}>
                    <Button>
                      <Text view="button">Buy Now</Text>
                    </Button>
                    <Button className={styles['add-to-cart-button']}>
                      <Text view="button" color="primary">
                        Add to Cart
                      </Text>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['related-items']}>
              <Text className={styles['related-items-title']} view="title" weight="bold">
                Related Items
              </Text>
            </div>
            <ProductList products={relatedProducts} />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
